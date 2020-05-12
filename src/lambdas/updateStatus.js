const main = require('../templates/main')
const rp = require('request-promise-native')
// const { db } = require('../firebase/firabaseConfig')
const postSheet = require('../utils/postSheets')
const translateStatus = require('../utils/translateStatus')
const { dateHourFormatterUTC3, dataHourFromatterZoop } = require('../utils/dateHourFormatterUTC3')

require('dotenv').config()

const updateStatus = async ({ body }) => {
    if(body.type === 'ping'){
        console.log('ping',body)
        return {
            statusCode: 200,
            body: JSON.stringify({
                mensagem: 'Webhook cadastrado com sucessso!!',
                data: dateHourFormatterUTC3(new Date())
            })
        }
    }else if(body.resource === 'event'){
        console.log('body de evento', body)
        const { payload } = body
        const { object } = payload
        const { id, status:statusNovo , payment_method } = object
        console.log('metodo de pagamento', payment_method)
        console.log('status', status)
        const { updated_at } = payment_method
        const corpo = [
            id,
            dateHourFormatterUTC3(new Date()),
            dateHourFormatterUTC3(dataHourFromatterZoop(updated_at)),
            translateStatus(statusNovo)
        ]
        try {
            const requestSheets = await rp(postSheet(corpo))
            console.log('responsa do update no googleSheets', requestSheets)
            // Firebase
            // try {
            //     const requestFirebase = await db.collection('credit-card-payments')
            //         .doc(id)
            //         .update({
            //             status: translateStatus(statusNovo)
            //         })
            // console.log('reposta do Firebase', requestFirebase)
            return {
                statusCode:200,
                body: JSON.stringify({
                    mensagem: 'Status salvo com sucesso no Sheet e no Firebase',
                    data: dateHourFormatterUTC3(new Date()),
                    statusTransacao: body.payload.status
                })
            }
            // } catch (error) {
            //     console.log('erro no firebase', error)
            // }
        } catch (error) {
            console.log('erro no sheets', error)
            return {
                statusCode: 500,
                body: JSON.stringify(error)
            }
        }
    }else{
        console.log('não reconheceu body', body)
        return {
            statusCode: 500,
            body: JSON.stringify({
                mensagem: 'Body não reconhecido!!',
                data: dateHourFormatterUTC3(new Date())
            })
        }
    }

}

module.exports = { handler: main(updateStatus) }