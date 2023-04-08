const { Kafka } = require('kafkajs')

const kafka = new Kafka({
  clientId: 'my-producer',
  brokers: ['localhost:9092']
})

const producer = kafka.producer()
async function main() {
    await producer.connect() // connect to producer
  
    process.on('SIGTERM', async () => {
      await consumer.disconnect()
      await producer.disconnect()
      process.exit(0)
    })

    while (true) {
    await new Promise(async (res) => {
        const data =  {
            type: 'Suspicious Account Activity',
            breachType: 'Multiple Unusual Transactions',
            reason: 'Multiple transactions have been identified in last 15 minutes in distanced locations.',
            email: 'zas99@hotmail.co.uk',
            phone: '01111111111'
        }
        const sendData = JSON.stringify(data)
      // send message pass in topic name and data
      await producer.send({
        topic: 'alert5',
        messages: [
            { value:  sendData }
        ],
      })
      setTimeout(() => res(null), 3 * Math.random() * 10000)
    })


  }
}

main().catch(console.error)
