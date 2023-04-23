ksql> create table residenceCountry(AccountId string primary key, accountHolder string, residence string) with (kafka_topic='countryResidenceTopic', value_format='json');

 Message       
---------------
 Table created 
---------------
ksql> select * from residenceCountry emit changes;
+-----------------------------------------------------------------+-----------------------------------------------------------------+-----------------------------------------------------------------+
|ACCOUNTID                                                        |ACCOUNTHOLDER                                                    |RESIDENCE                                                        |
+-----------------------------------------------------------------+-----------------------------------------------------------------+-----------------------------------------------------------------+
|71234567                                                         |S Shah                                                           |UK                                                               |
|71234568                                                         |A Pope                                                           |USA                                                              |
|71234569                                                         |J Homer                                                          |JP                                                               |
^CQuery terminated


ksql> create stream cardTransactionDataStr(transactionId string, accountId string, cardId string, amount decimal(12,2), transactionCountry string) with(kafka_topic='cardTransactionDataTopic', value_format='json');

 Message        
----------------
 Stream created 
----------------
ksql> select * from cardTransactionDataStr emit changes;
+--------------------------------------+--------------------------------------+--------------------------------------+--------------------------------------+--------------------------------------+
|TRANSACTIONID                         |ACCOUNTID                             |CARDID                                |AMOUNT                                |TRANSACTIONCOUNTRY                    |
+--------------------------------------+--------------------------------------+--------------------------------------+--------------------------------------+--------------------------------------+
|71561234567982                        |71234567                              |1234567891234407                      |100000.00                             |UK                                    |
|71568123456793                        |71234567                              |1234567891234408                      |100000.00                             |NKR                                   |
|71568123456794                        |71234568                              |1234567891234409                      |100000.00                             |USA                                   |
^CQuery terminated


ksql> create stream residenceCountryCheck with(kafka_topic='residence_check_topic',value_format='json') as select TRANSACTIONID, lhs.ACCOUNTID accountid, CARDID, TRANSACTIONCOUNTRY,ACCOUNTHOLDER from cardTransactionDataStr lhs inner join residenceCountry rhs on lhs.ACCOUNTID=rhs.ACCOUNTID where TRANSACTIONCOUNTRY != RESIDENCE emit changes;

  Message                                             
-----------------------------------------------------
 Created query with ID CSAS_RESIDENCECOUNTRYCHECK_57 
-----------------------------------------------------

ksql> create table alert3 with (kafka_topic='alert7') as select concat(transactionId,accountId) alertID, 'Residence Country Activity' Alert_Type, 'Foreign Country Transactions' Breach_Type, latest_by_off
set(transactionId) transactionId, latest_by_offset(accountId) accountId, latest_by_offset(cardId) cardId, latest_by_offset(ACCOUNTHOLDER) ACCOUNTHOLDER from residenceCountryCheck group by concat(transact
ionId,accountId) emit changes;

 Message                              
--------------------------------------
 Created query with ID CTAS_ALERT3_63 
--------------------------------------
ksql> select * from alert3 emit changes;
+---------------------------+---------------------------+---------------------------+---------------------------+---------------------------+---------------------------+---------------------------+
|ALERTID                    |ALERT_TYPE                 |BREACH_TYPE                |TRANSACTIONID              |ACCOUNTID                  |CARDID                     |ACCOUNTHOLDER              |
+---------------------------+---------------------------+---------------------------+---------------------------+---------------------------+---------------------------+---------------------------+
|7156812345679371234567     |Residence Country Activity |Foreign Country Transaction|71568123456793             |71234567                   |1234567891234408           |S Shah                     |
|                           |                           |s                          |                           |                           |                           |                           |
^CQuery terminated
