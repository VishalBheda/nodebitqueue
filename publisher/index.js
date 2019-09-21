"use strict"

const rabbitQ = require('../RabbitWrapper/RabbitService');
const standardInput = process.stdin;

async function main() {
    const channel = await rabbitQ.getRabbitChannel()
    standardInput.on('data', (msg)=>{
        rabbitQ.sendMessage(msg, channel, 'first')
    })
}

main()
