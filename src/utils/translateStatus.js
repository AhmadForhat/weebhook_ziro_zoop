const translateStatus = status => {
    switch (status) {
    case 'pre_authorized': return 'Pré Autorizado'
    case 'succeeded': return 'Pago'
    case 'failed': return 'Falhado'
    case 'pending': return 'Aprovação Pendente'
    default: return 'Cancelado'
    }
}

module.exports = translateStatus