#!/bin/bash
export CONFLUENT_HOME=/home/zeyad/kafka/confluent-7.3.3
export PATH=$CONFLUENT_HOME/bin:$PATH
echo "*** Starting Kafka Broker ***"
nohup ${CONFLUENT_HOME}/bin/kafka-server-start ${CONFLUENT_HOME}/etc/kafka/server.properties &
sleep 10
echo "*** Kafka Broker Started ***"
