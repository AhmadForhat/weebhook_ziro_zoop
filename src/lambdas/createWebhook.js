const rp = require('request-promise-native')
const main = require('../templates/main')
require('dotenv').config()

const createWebhook = async (event) => {
    console.log(event)
    const url = `${process.env.BASIC_URL}/${process.env.MARKET_ID}/webhooks`
    const config = {
        headers: {
            'Content-type':'application/json',
            'Authorization': process.env.ZOOP_KEY
        },
    }
    const bodyPayment = {
        method: 'POST',
        url: process.env.ZIRO_URL,
        description: event.body.description,
        events: ['transaction.succeeded','transaction.canceled','transaction.failed','transaction.reversed']
    }
    try {
        const createWebhooks = await rp(url,bodyPayment,config)
        console.log('resposta a criação do webhook', createWebhooks)
        return {
            statusCode:200,
            body: {
                mensagem: 'webhook creado com sucesso',
            }
        }
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify(error)
        }
    }
}

module.exports = { handler: main(createWebhook) }