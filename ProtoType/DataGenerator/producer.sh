./bin/kafka-console-producer --bootstrap-server localhost:9092 --topic sourceDataTopic < input_sourceDataTopic.json

./bin/kafka-console-producer --bootstrap-server localhost:9092 --topic referenceTimeTopic --property parse.key=true --property key.separator=? < input_referenceTimeTopic.json