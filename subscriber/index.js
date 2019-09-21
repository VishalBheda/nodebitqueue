"use strict"

const rabbitQ = require('../RabbitWrapper/RabbitService')

function cb(msg) {
    console.log(`Message Recived: ${msg}`)
}

async function main() {
    const channel = await rabbitQ.getRabbitChannel()
    rabbitQ.receiveMessage(channel, 'first', cb)
}

main()
