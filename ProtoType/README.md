How To Guide
Step 1
Produce Reference data
./bin/kafka-console-producer --bootstrap-server localhost:9092 --topic referenceTimeTopic --property parse.key=true --property key.separator=? < /home/sami/dotnetProjects/kafka-dotnet-getting-started/Project2023/ProtoType/DataGenerator/input_referenceTimeTopic.json
[2023-01-29 19:20:18,031] WARN [Producer clientId=console-producer] Error while fetching metadata with correlation id 1 : {referenceTimeTopic=LEADER_NOT_AVAILABLE} (org.apache.kafka.clients.NetworkClient)

Step 2
Produce source data
./bin/kafka-console-producer --bootstrap-server localhost:9092 --topic sourceDataTopic < /home/sami/dotnetProjects/kafka-dotnet-getting-started/Project2023/ProtoType/DataGenerator/input_sourceDataTopic.json
[2023-01-29 18:54:04,399] WARN [Producer clientId=console-producer] Error while fetching metadata with correlation id 1 : {sourceDataTopic=LEADER_NOT_AVAILABLE} (org.apache.kafka.clients.NetworkClient)

Step 3
Login to ksql-cli and set offset
ksql> set 'auto.offset.reset'='earliest';

Step 4
In ksql cli create reference table
ksql> create table referenceTime(postcodes struct<postcodeA string, postcodeB string> primary key, travelTime bigint, timeMS bigint)
>with(kafka_topic='referenceTimeTopic', partitions=1, value_format='json', key_format='json');

Message
---------------
Table created
---------------
ksql> select rowtime, * from referenceTime emit changes;
+------------------------------------------------+------------------------------------------------+------------------------------------------------+------------------------------------------------+
|ROWTIME                                         |POSTCODES                                       |TRAVELTIME                                      |TIMEMS                                          |
+------------------------------------------------+------------------------------------------------+------------------------------------------------+------------------------------------------------+
|1675020018130                                   |{POSTCODEA=WC1N, POSTCODEB=HA5}                 |1200                                            |1675017000                                      |
|1675020018146                                   |{POSTCODEA=WC1N, POSTCODEB=HA2}                 |1200                                            |1675017000                                      |
|1675020018146                                   |{POSTCODEA=HA2, POSTCODEB=WC1N}                 |1200                                            |1675017000                                      |
|1675020018146                                   |{POSTCODEA=HA5, POSTCODEB=WC1N}                 |1200                                            |1675017000                                      |
^CQuery terminated


Step 5
In ksql cli, create stream
ksql> create stream sourceData(transactionId string, accountId string, cardId string, txTime bigint, amount double, TxPostcode string, TxCountry string)
>with(kafka_topic='sourceDataTopic', partitions=1, value_format='json', timestamp='txTime');

Message
----------------
Stream created
----------------
ksql> select rowtime, * from sourceData emit changes;
+-----------------------+-----------------------+-----------------------+-----------------------+-----------------------+-----------------------+-----------------------+-----------------------+
|ROWTIME                |TRANSACTIONID          |ACCOUNTID              |CARDID                 |TXTIME                 |AMOUNT                 |TXPOSTCODE             |TXCOUNTRY              |
+-----------------------+-----------------------+-----------------------+-----------------------+-----------------------+-----------------------+-----------------------+-----------------------+
|1675017875             |123456789              |34567654               |1234432123455432       |1675017875             |124.54                 |HA5 2BX                |UK                     |
|1675018654             |123456790              |34567654               |1234432123455432       |1675018654             |124.54                 |HA5 3YZ                |UK                     |
|1675018655             |123456791              |34567654               |1234432123455432       |1675018655             |124.54                 |WC1N 3YZ               |UK                     |
|1675018655             |123456792              |34567656               |1234432123455437       |1675018655             |124.54                 |HA2 3YZ                |UK                     |
^CQuery terminated
ksql> drop table referenceTime;

Step 6
Create processing table for calculating last two transactions
ksql> create table cardUsageDistance as select cardId, latest_by_offset(transactionId) transactionId, latest_by_offset(accountId) accountId,
>latest_by_offset(txTime) txTime, latest_by_offset(amount) amount, latest_by_offset(TxPostcode) TxPostcode,
>(case when array_length(collect_list(TxPostcode)) > 1 then collect_list(TxPostcode)[array_length(collect_list(TxPostcode)) - 2]
>else null end) as TxPostcodePrev,
>latest_by_offset(txTime) - (case when array_length(collect_list(txTime)) > 1 then collect_list(txTime)[array_length(collect_list(txTime)) - 2] else cast(0 as bigint) end) as travelTime
>from sourceData group by cardId emit changes;

Message
-------------------------------------------------
Created query with ID CTAS_CARDUSAGEDISTANCE_29
-------------------------------------------------
ksql> select * from cardUsageDistance;
+-----------------------+-----------------------+-----------------------+-----------------------+-----------------------+-----------------------+-----------------------+-----------------------+
|CARDID                 |TRANSACTIONID          |ACCOUNTID              |TXTIME                 |AMOUNT                 |TXPOSTCODE             |TXPOSTCODEPREV         |TRAVELTIME             |
+-----------------------+-----------------------+-----------------------+-----------------------+-----------------------+-----------------------+-----------------------+-----------------------+
|1234432123455432       |123456791              |34567654               |1675018655             |124.54                 |WC1N 3YZ               |HA5 2BX                |780                    |
|1234432123455437       |123456792              |34567656               |1675018655             |124.54                 |HA2 3YZ                |null                   |1675018655             |
Query terminated

Step 7
Create final Alert
ksql> create table alert as select concat(transactionId,cardId,accountId) alertID, 'Suspicious Account Activity' Alert_Type, 'Multiple Unusual Transactions' Breach_Type,
>cardId, transactionId, accountId, amount,
>TxPostcode from cardUsageDistance lhs join referenceTime rhs
>on struct(postcodeA:=split(lhs.TxPostcode,' ')[1], postcodeB:=split(lhs.TxPostcodePrev,' ')[1]) = postcodes
>where lhs.travelTime < rhs.travelTime
>emit changes;

Message
-------------------------------------
Created query with ID CTAS_ALERT_35
-------------------------------------
ksql> select * from alert;
+-----------------------+-----------------------+-----------------------+-----------------------+-----------------------+-----------------------+-----------------------+-----------------------+
|CARDID                 |ALERTID                |ALERT_TYPE             |BREACH_TYPE            |TRANSACTIONID          |ACCOUNTID              |AMOUNT                 |TXPOSTCODE             |
+-----------------------+-----------------------+-----------------------+-----------------------+-----------------------+-----------------------+-----------------------+-----------------------+
|1234432123455432       |12345679112344321234554|Suspicious Account Acti|Multiple Unusual Transa|123456791              |34567654               |124.54                 |WC1N 3YZ               |
|                       |3234567654             |vity                   |ctions                 |                       |                       |                       |                       |
Query terminated



