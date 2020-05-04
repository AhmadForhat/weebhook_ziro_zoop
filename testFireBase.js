require('dotenv').config()

const { db } = require('./src/firebase/firabaseConfig')
const id = 'batata'
const newStatus = 'beterraba'

const consulta = async () => {
    try {
        await db.collection('credit-card-payments')
            .doc(id)
            .update({
                status: newStatus
            })
    } catch (error) {
        console.log(error)
    }

}

consulta()