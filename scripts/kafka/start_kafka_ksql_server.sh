#!/bin/bash
export CONFLUENT_HOME=/home/zeyad/kafka/confluent/confluent-7.3.3
export PATH=$CONFLUENT_HOME/bin:$PATH
echo "*** Starting KSQL Server ***"
${CONFLUENT_HOME}/bin/confluent local services ksql-server start
sleep 5
${CONFLUENT_HOME}/bin/confluent local services ksql-server status
echo "*** KSQL Server Started ***"
