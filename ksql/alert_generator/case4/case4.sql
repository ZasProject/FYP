create stream accountTransactionDataStr(transactionId string, accountId string, cardId string, amount decimal(12,2), transactionCountry string) with(kafka_topic='accountTransactionDataTopic', value_format='json');

 Message        
----------------
 Stream created 
----------------
ksql> select rowtime, * from accountTransactionDataStr emit changes;
+-------------------------------+-------------------------------+-------------------------------+-------------------------------+-------------------------------+-------------------------------+
|ROWTIME                        |TRANSACTIONID                  |ACCOUNTID                      |CARDID                         |AMOUNT                         |TRANSACTIONCOUNTRY             |
+-------------------------------+-------------------------------+-------------------------------+-------------------------------+-------------------------------+-------------------------------+
|1681602565404                  |71561234567982                 |71234567                       |1234567891234407               |100000.00                      |UK                             |
|1681602565440                  |71568123456794                 |71234568                       |1234567891234409               |100000.00                      |USA                            |
|1681602565440                  |71561234567983                 |71234567                       |1234567891234407               |100000.00                      |UK                             |
|1681602565440                  |71568123456984                 |71234568                       |1234567891234409               |100000.00                      |USA                            |
|1681602565440                  |71561234567985                 |71234567                       |1234567891234407               |100000.00                      |UK                             |
|1681602565440                  |71568123456986                 |71234568                       |1234567891234409               |100000.00                      |USA                            |
|1681602565440                  |71561234567987                 |71234567                       |1234567891234407               |100000.00                      |UK                             |
|1681602565440                  |71568123456988                 |71234568                       |1234567891234409               |100000.00                      |USA                            |
|1681602565441                  |71561234567989                 |71234567                       |1234567891234407               |100000.00                      |UK                             |
^CQuery terminated



ksql> create table alert4 with (kafka_topic='alert8') as select concat(cardid,accountId) alertID, 'Card Fraud Activity' Alert_Type, 'Frequent Transactions' Breach_Type, latest_by_offset(accountId) accoun
tId, latest_by_offset(cardId) cardId from accountTransactionDataStr window tumbling(size 60 minutes) group by concat(cardId,accountId) having count(*) > 4 emit changes;

 Message                              
--------------------------------------
 Created query with ID CTAS_ALERT4_71 
--------------------------------------
ksql> select * from alert4 emit changes;
+---------------------------+---------------------------+---------------------------+---------------------------+---------------------------+---------------------------+---------------------------+
|ALERTID                    |WINDOWSTART                |WINDOWEND                  |ALERT_TYPE                 |BREACH_TYPE                |ACCOUNTID                  |CARDID                     |
+---------------------------+---------------------------+---------------------------+---------------------------+---------------------------+---------------------------+---------------------------+
|123456789123440771234567   |1681599600000              |1681603200000              |Card Fraud Activity        |Frequent Transactions      |71234567                   |1234567891234407           |
^CQuery terminated

