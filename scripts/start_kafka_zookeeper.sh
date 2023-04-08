#!/bin/bash
export CONFLUENT_HOME=/home/zeyad/kafka/confluent-7.3.2
export PATH=$CONFLUENT_HOME/bin:$PATH
echo "*** Starting Kafka Zookeeper ***"
nohup ${CONFLUENT_HOME}/bin/zookeeper-server-start ${CONFLUENT_HOME}/etc/kafka/zookeeper.properties &
sleep 10
echo "*** Kafka Zookeeper Started ***"
