#!/bin/bash
export CONFLUENT_HOME=/home/zeyad/kafka/confluent-7.3.2
export PATH=$CONFLUENT_HOME/bin:$PATH
${CONFLUENT_HOME}/bin/ksql
