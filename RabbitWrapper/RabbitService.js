"use strict"
const amqp = require('amqplib')

class RabbitService {
    constructor(host){
        this.rabbitHost = 'guest:guest@localhost'
        this.exchange = 'myExchange'
        this.queueList = ['first', 'second']
        this.fetchSize = 1
    }

    async getRabbitChannel(){
        let ch = null;

        try {
            var conn = await amqp.connect('amqp://'+this.rabbitHost)
        } catch(err) {
            console.log("Error in creating connection")
            console.log(err)
        }

        try {
            ch = await conn.createChannel()
        } catch(e) {
            console.log("Error in Channel Creation!")
            console.log(e)
        }

        try {
            await ch.assertExchange(this.exchange,'direct',{durable:true})
        } catch(e) {
            console.log("Error in Exchange Asserting")
            console.log(e)
        }

        for(let qName of this.queueList) {
            try {
                await ch.assertQueue(qName, {durable: true})
            } catch (e) {
                console.log("Error in Queues asserting")
                console.log(e)
            }
        }
        return ch;
    }

    sendMessage(message, channel, qName){
        let response = false
        try {
            response = channel.sendToQueue(qName, Buffer.from(message))
            if(response){
                console.log("Message Sent!")
            }
        }catch(e){
            console.log("Error in sending message!")
            console.log(e)
        }
        return response
    }

    receiveMessage(channel, qName, callback){
        channel.prefetch(this.fetchSize)
        channel.consume(qName, function (message) {
            callback(message.content.toString())
            channel.ack(message)
        }, {noAck: false})
    }
}

module.exports = new RabbitService()

// Consumer
// (async ()=>{
//     let rabbit = new RabbitService()
//     let channel = await rabbit.getRabbitChannel()
//     let response = await rabbit.sendMessage("hello World", channel, 'first')
//     if(response){
//         console.log("message sent success!")
//     } else {
//         console.log("message sent failure!")
//     }
// })()

//Subscriber
// function cb(msg) {
//     console.log(msg)
// }
// (async ()=>{
//     let rabbit = new RabbitService()
//     let channel = await rabbit.getRabbitChannel()
//     rabbit.receiveMessage(channel, 'first', cb)
// })()
