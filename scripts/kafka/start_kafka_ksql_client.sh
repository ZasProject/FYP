#!/bin/bash
export CONFLUENT_HOME=/home/zeyad/kafka/confluent/confluent-7.3.3
export PATH=$CONFLUENT_HOME/bin:$PATH
${CONFLUENT_HOME}/bin/ksql
