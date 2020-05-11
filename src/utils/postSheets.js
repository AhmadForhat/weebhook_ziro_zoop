const optionsPost = (body) =>{
    const url = process.env.URL_SHEET
    const auth = `Basic ${process.env.TOKEN_SHEET}`

    return {
        method: 'POST',
        url:url,
        headers: {
            'Origin': 'https://ziro.app',
            'Content-type': 'application/json',
            'Authorization': auth
        },
        body : {
            'apiResource': 'values',
            'apiMethod': 'append',
            'spreadsheetId': process.env.ID_SHEET,
            'range': 'statusTransacao!A2',
            'resource': {
                'values': [body]
            },
            'valueInputOption': 'raw'
        },
        json: true
    }
}

module.exports = optionsPost