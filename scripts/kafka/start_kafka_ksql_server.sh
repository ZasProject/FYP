#!/bin/bash
export CONFLUENT_HOME=/home/zeyad/kafka/confluent-7.3.3
export PATH=$CONFLUENT_HOME/bin:$PATH
echo "*** Starting KSQL Server ***"
nohup ${CONFLUENT_HOME}/bin/ksql-server-start ${CONFLUENT_HOME}/etc/ksqldb/ksql-server.properties ${CONFLUENT_HOME}/logs/ksql-server.log 2>&1 &
sleep 10
echo "*** KSQL Server Started ***"
