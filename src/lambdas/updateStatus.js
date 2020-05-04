const main = require('../templates/main')
const rp = require('request-promise-native')
const { dateHourFormatterUTC3, dataHourFromatterZoop } = require('../utils/dateHourFormatterUTC3')
const postSheet = require('../utils/postSheets')

require('dotenv').config()

const getEmployees = async ({ body }) => {
    const { payload } = body
    const { id, status, payment_method } = payload
    const { updated_at } = payment_method
    const corpo = [
        id,
        dateHourFormatterUTC3(new Date()),
        dateHourFormatterUTC3(dataHourFromatterZoop(updated_at)),
        status
    ]
    try {
        console.log(body)
        const request = rp(postSheet(corpo))
        console.log('responsa do update no googleSheets', request._rp_options.body)
        return {
            statusCode:200,
            body: JSON.stringify({
                mensagem: 'Status salvo com sucesso no Sheet',
                data: dateHourFormatterUTC3(new Date()),
                statusTransacao: body.payload.status
            })
        }
    } catch (error) {
        console.log(error)
        return {
            statusCode: 500,
            body: JSON.stringify(error)
        }
    }
}

module.exports = { handler: main(getEmployees) }