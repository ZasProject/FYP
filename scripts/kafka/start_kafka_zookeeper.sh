#!/bin/bash
export CONFLUENT_HOME=/home/zeyad/kafka/confluent/confluent-7.3.3
export PATH=$CONFLUENT_HOME/bin:$PATH
echo "*** Starting Kafka Zookeeper ***"
${CONFLUENT_HOME}/bin/confluent local services zookeeper start
sleep 5
${CONFLUENT_HOME}/bin/confluent local services zookeeper status
echo "*** Kafka Zookeeper Started ***"
