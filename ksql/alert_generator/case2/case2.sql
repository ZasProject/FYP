ksql> create table restricted_country(CountryID string primary key, countryName string, restricted string) with (kafka_topic='countryReferenceTopic', value_format='json');

 Message       
---------------
 Table created 
---------------
ksql> select * from restricted_country emit changes;
+-----------------------------------------------------------------+-----------------------------------------------------------------+-----------------------------------------------------------------+
|COUNTRYID                                                        |COUNTRYNAME                                                      |RESTRICTED                                                       |
+-----------------------------------------------------------------+-----------------------------------------------------------------+-----------------------------------------------------------------+
|IRN                                                            |Iran                                                             |Y                                                                |
|CHN                                                            |China                                                            |N                                                                |
|NKR                                                            |Nort Korea                                                       |Y                                                                |
^CQuery terminated


ksql> create stream transactionStr(transactionId string, accountId string, cardId string, amount decimal(12,2), OriginatingCountry string, DestinationCountry string) with(kafka_topic='transactionDataTopi
c', value_format='json');

 Message        
----------------
 Stream created 
----------------
ksql> select * from transactionStr emit changes;
+-------------------------------+-------------------------------+-------------------------------+-------------------------------+-------------------------------+-------------------------------+
|TRANSACTIONID                  |ACCOUNTID                      |CARDID                         |AMOUNT                         |ORIGINATINGCOUNTRY             |DESTINATIONCOUNTRY             |
+-------------------------------+-------------------------------+-------------------------------+-------------------------------+-------------------------------+-------------------------------+
|8123456792                     |34567656                       |N/A                            |100000.00                      |IRN                            |UK                             |
|8123456793                     |34567657                       |N/A                            |100000.00                      |IRN                            |NKR                            |
|8123456794                     |34567658                       |N/A                            |100000.00                      |CHN                            |UK                             |
^CQuery terminated

ksql> create stream originatingCountryCheck with(kafka_topic='country_check_topic',value_format='json') as select TRANSACTIONID, ACCOUNTID, COUNTRYNAME,COUNTRYID from transactionStr lhs inner join restricted_country rhs on lhs.ORIGINATINGCOUNTRY=rhs.COUNTRYID where restricted = 'Y' emit changes;

 Message                                               
-------------------------------------------------------
 Created query with ID CSAS_ORIGINATINGCOUNTRYCHECK_45 
-------------------------------------------------------
ksql> create stream destinationCountryCheck with(kafka_topic='country_check_topic',value_format='json') as select TRANSACTIONID, ACCOUNTID, COUNTRYNAME,COUNTRYID from transactionStr lhs inner join restricted_country rhs on lhs.DESTINATIONCOUNTRY=rhs.COUNTRYID where restricted = 'Y' emit changes;

 Message                                               
-------------------------------------------------------
 Created query with ID CSAS_DESTINATIONCOUNTRYCHECK_47 
-------------------------------------------------------
ksql> create stream countryCheck(TRANSACTIONID string, ACCOUNTID string, COUNTRYNAME string) with(kafka_topic='country_check_topic',value_format='json');

 Message        
----------------
 Stream created 
----------------
ksql> create table alert2 with (kafka_topic='alert6') as select concat(transactionId,accountId) alertID, 'Restricted Country Activity' Alert_Type, 'Restricted Country Transactions' Breach_Type, latest_by_offset(transactionId) transactionId, latest_by_offset(accountId) accountId from countryCheck group by concat(transactionId,accountId) emit changes;

 Message                              
--------------------------------------
 Created query with ID CTAS_ALERT2_51 
--------------------------------------
ksql> select * from alert2 emit changes;
+--------------------------------------+--------------------------------------+--------------------------------------+--------------------------------------+--------------------------------------+
|ALERTID                               |ALERT_TYPE                            |BREACH_TYPE                           |TRANSACTIONID                         |ACCOUNTID                             |
+--------------------------------------+--------------------------------------+--------------------------------------+--------------------------------------+--------------------------------------+
|812345679234567656                    |Restricted Country Activity           |Restricted Country Transactions       |8123456792                            |34567656                              |
|812345679334567657                    |Restricted Country Activity           |Restricted Country Transactions       |8123456793                            |34567657                              |
^CQuery terminated
