const express = require('express');
const app = express();
const kafka = require('kafka-node');
var nodemailer = require('nodemailer');
const cors = require('cors');

// allow cors for the client (UI) domain (here running locally on localhost:4200) to prevent api failure due to cross origin issue
app.use(cors({
  origin: 'http://localhost:4200',
  allowedHeaders: 'Content-Type',
  methods: 'GET,POST'
}));

const Consumer = kafka.Consumer;
//Create a new kafka client to listen on the 'close-alert' topic
const alertGeneratorClient = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });

// create a new consumer to listen on the topic 'close-alert'
const externalAlertGenerator = new Consumer(
  alertGeneratorClient,
  [{ topic: 'close-alert' }],
  { autoCommit: true }
);

externalAlertGenerator.on('message', function (message) {
  const alertDetails = JSON.parse(message.value)
  // format message to a readable format to send in email body
  const formatMessage = `<html>
  <head><h2>Alert Management System - Alert Closed</h2></head>
  <body>
    <p>Alert Details:</p>
    <p>${alertDetails.id} - ${alertDetails.type} - ${alertDetails.breachType} - ${alertDetails.reason}</p>
    <p> Alert closed with reasons - ${alertDetails.actionTaken}</p>
    <p> Office Comments - ${alertDetails.comments}</p>

  </body>
  </html>`

  console.log(formatMessage)
  // use nodemailer api to send data to email. Configure self email details - username password and the mailing service
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'alert@gmail.com',
      pass: ''
    }
  });
  var mailOptions = {
    from: 'alert@gmail.com',
    to: alertDetails.email,
    subject: 'AMS- Alert From Kafka',
    html: formatMessage
  };
  transporter.sendMail(mailOptions, function(error, info){
    // if(error) {
    //   res.send(error);
    // } else {
    //   res.send('successfully sent')
    // }
  });
});

app.listen(3001, () => {
  console.log('Server started on port 3001');
});

