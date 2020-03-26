let endpoints = require('../../static/endpoints')
let {justFetch, appendQueriesToUrl} = require('../../utils/index')

let fetchpendingshipment = async () => {
    let {url} = endpoints.filter(ept => ept.id == "national__pending_shipments")[0]
    try {
        let sc = await justFetch(url)
        return sc
    } catch (er) {
        return {error: true, ...er}
    }
}

let updatependingshipment = async (postoptions) => {
    let {url} = endpoints.filter(ept => ept.id == "national__pending_shipments")[0]
    let options = {}
    options.method = "PUT" //POST if not existing. Irrelevant for now
    options.body = postoptions.body
    try {
        let sc = await justFetch(url, options)
        return sc
    } catch (er) {
        return {error: true, ...er}
    }
}

let creatependingshipment = async (postoptions) => { //Likely unnecessary
    let {url} = endpoints.filter(ept => ept.id == "national__pending_shipments")[0]
    let options = {}
    options.method = "POST" //POST if not existing. Irrelevant for now
    options.body = postoptions.body
    try {
        let sc = await justFetch(url, options)
        return sc
    } catch (er) {
        return {error: true, ...er}
    }
}

module.exports = {fetchpendingshipment, creatependingshipment, updatependingshipment}