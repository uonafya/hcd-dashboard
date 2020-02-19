let endpoints = require('../static/endpoints')
let {justFetch, appendQueriesToUrl} = require('../utils/index')

let fetchStockStatus = async (ou,level,pe) => {
    try {
        let {url, default_org_unit, default_period, default_org_unit_level} = endpoints.filter(ept => ept.id == "all__stock_status")[0]
        let query = {pe, ou, level}
        let defaults = {default_pe: default_period, default_ou: default_org_unit, default_lvl: default_org_unit_level}
        let final_url = appendQueriesToUrl(url, query, defaults)
        let sc = await justFetch(final_url)
        return sc
    } catch (er) {
        return {error: true, ...er}
    }
}

let fetchMOS = async () => {
    let url = endpoints.filter(ept => ept.id == "all__mos_by_commodity")[0].url
    try {
        let sc = await justFetch(url)
        return sc
    } catch (er) {
        return {error: true, ...er}
    }
}

let fetchFacilityStockStatus = async () => {
    let url = endpoints.filter(ept => ept.id == "all__mos_by_commodity")[0].url
    try {
        let sc = await justFetch(url)
        return sc
    } catch (er) {
        return {error: true, ...er}
    }
}

module.exports = {fetchStockStatus, fetchMOS, fetchFacilityStockStatus}