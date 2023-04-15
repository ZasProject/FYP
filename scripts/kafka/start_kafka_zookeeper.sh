#!/bin/bash
export CONFLUENT_HOME=/home/zeyad/kafka/confluent-7.3.3
export PATH=$CONFLUENT_HOME/bin:$PATH
echo "*** Starting Kafka Zookeeper ***"
nohup ${CONFLUENT_HOME}/bin/zookeeper-server-start ${CONFLUENT_HOME}/etc/kafka/zookeeper.properties > ${CONFLUENT_HOME}/logs/zookeeper.log 2>&1 &
sleep 30
echo "*** Kafka Zookeeper Started ***"
