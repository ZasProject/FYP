ksql> create table alertPreferenceTable(AccountID string primary key, mediaType string, alertDestination string) with (kafka_topic='alertPreferenceTopic', value_format='json');

 Message       
---------------
 Table created 
---------------
ksql> select * from alertPreferenceTable emit changes;
+-----------------------------------------------------------------+-----------------------------------------------------------------+-----------------------------------------------------------------+
|ACCOUNTID                                                        |MEDIATYPE                                                        |ALERTDESTINATION                                                 |
+-----------------------------------------------------------------+-----------------------------------------------------------------+-----------------------------------------------------------------+
|71234567                                                         |EMAIL                                                            |abc@myemail.com                                                  |
|71234568                                                         |TEXT                                                             |00447738129660                                                   |
^CQuery terminated


ksql> create table alertWithPreference as select alertid, ALERT_TYPE,BREACH_TYPE,lhs.ACCOUNTID,CARDID,MEDIATYPE,ALERTDESTINATION from  alert3 lhs  left join alertPreferenceTable rhs on lhs.accountid = rh
s.accountid emit changes;

 Message                                           
---------------------------------------------------
 Created query with ID CTAS_ALERTWITHPREFERENCE_77 
---------------------------------------------------
ksql> select * from alertWithPreference emit changes;
+---------------------------+---------------------------+---------------------------+---------------------------+---------------------------+---------------------------+---------------------------+
|ALERTID                    |ALERT_TYPE                 |BREACH_TYPE                |LHS_ACCOUNTID              |CARDID                     |MEDIATYPE                  |ALERTDESTINATION           |
+---------------------------+---------------------------+---------------------------+---------------------------+---------------------------+---------------------------+---------------------------+
|7156812345679371234567     |Residence Country Activity |Foreign Country Transaction|71234567                   |1234567891234408           |EMAIL                      |abc@myemail.com            |
|                           |                           |s                          |                           |                           |                           |                           |
^CQuery terminated
