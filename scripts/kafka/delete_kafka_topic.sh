#!/bin/bash
export CONFLUENT_HOME=/home/zeyad/kafka/confluent/confluent-7.3.3
export PATH=$CONFLUENT_HOME/bin:$PATH
echo "*** Deleting Kafka Topic  ***"
${CONFLUENT_HOME}/bin/kafka-topics -bootstrap-server localhost:9092 --delete --topic $1
