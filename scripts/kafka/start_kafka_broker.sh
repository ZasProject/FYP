#!/bin/bash
export CONFLUENT_HOME=/home/zeyad/kafka/confluent/confluent-7.3.3
export PATH=$CONFLUENT_HOME/bin:$PATH
echo "*** Starting Kafka Broker ***"
${CONFLUENT_HOME}/bin/confluent local services kafka start 
sleep 5
${CONFLUENT_HOME}/bin/confluent local services kafka status
echo "*** Kafka Broker Started ***"
