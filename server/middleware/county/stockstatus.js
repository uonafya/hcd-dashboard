let endpoints = require('../../static/endpoints')
let {justFetch, appendQueriesToUrl} = require('../../utils/index')
let {fetchMCFOUs, fetchOrgUnitDetails} = require('../common')

let fetchAS = async (ou,level,pe) => {
    let {url, default_org_unit, default_org_unit_level, default_period} = endpoints.filter(ept => ept.id == "county__artesunate_injection")[0]
    let defaults = {default_pe: default_period, default_ou: default_org_unit, default_lvl: default_org_unit_level}
    let query = {pe, ou, level}
    try {
        let final_url = appendQueriesToUrl(url, query, defaults)
        let sc = await justFetch(final_url)
        return sc
    } catch (er) {
        return {error: true, ...er}
    }
}


let fetchAL = async (ou,level,pe) => {
    let {url, default_org_unit, default_org_unit_level, default_period} = endpoints.filter(ept => ept.id == "county__artemether_lumefantrine")[0]
    // let valid_ous = await valid_ous0.json()
    
    let defaults = {default_pe: default_period, default_ou: default_org_unit, default_lvl: default_org_unit_level}
    let query = {pe, ou, level}
    try {
        let final_url = appendQueriesToUrl(url, query, defaults)
        let sc = await justFetch(final_url)
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        let valid_ous0 = await fetchMCFOUs()
        let pri_ou = await fetchOrgUnitDetails(ou)
        let valid_ous = valid_ous0.dataSets[0].organisationUnits
        let reply = {}
        reply.period = sc.metaData.items[sc.metaData.dimensions.pe[0]].name
        reply.ou = pri_ou.name != undefined ? pri_ou.name : ou
        reply.lvl = pri_ou.level != undefined ? pri_ou.level : level
        reply.columns = [ "Name", "MFL Code", "RR%", "OT RR%", "AL6 SOH", "AL6 MOS", "AL12 SOH", "AL12 MOS", "AL18 SOH", "AL18 MOS", "AL24 SOH", "AL24 MOS", "ACT MOS", ]
        reply.rows = []
        sc.metaData.dimensions.ou.map(one_ou => {
          let ou_row = []
          let name = sc.metaData.items[one_ou].name
          let fil_ou = valid_ous.filter(v_o => v_o.id == one_ou)
          let code = fil_ou.length > 0 ? fil_ou[0].code : "N/A"
          let data_rows = sc.rows.filter(o_r => o_r[2] == one_ou)  // get all rows for each ou
          let rr_p_SRC = data_rows.filter(rr_p_S => rr_p_S[0] == "JPaviRmSsJW.REPORTING_RATE")[0]; // reporting_rate
          let rr_p; if(rr_p_SRC != null || rr_p_SRC != undefined){ rr_p = parseFloat(rr_p_SRC[3]) }else{ rr_p = 0}
          let otrr_p_SRC = data_rows.filter(otrr_p_S => otrr_p_S[0] == "JPaviRmSsJW.REPORTING_RATE_ON_TIME")[0]; // ontime_reporting_rate
          let otrr_p; if(otrr_p_SRC != null || otrr_p_SRC != undefined){ otrr_p = parseFloat(otrr_p_SRC[3]) }else{ otrr_p = 0}
          let al6_soh_SRC = data_rows.filter(al6_soh_S => al6_soh_S[0] == "BnGDrFwyQp9.rPAsF4cpNxm")[0]; // al6_soh
          let al6_soh; if(al6_soh_SRC != null || al6_soh_SRC != undefined){ al6_soh = parseFloat(al6_soh_SRC[3]) }else{ al6_soh = 0}
          let al6_mos_SRC = data_rows.filter(al6_mos_S => al6_mos_S[0] == "HfGVoCZAwtd")[0]; // al6_mos
          let al6_mos; if(al6_mos_SRC != null || al6_mos_SRC != undefined){ al6_mos = parseFloat(al6_mos_SRC[3]) }else{ al6_mos = 0}
          let al12_soh_SRC = data_rows.filter(al12_soh_S => al12_soh_S[0] == "c0MB4RmVjxk.rPAsF4cpNxm")[0];  // al12_soh
          let al12_soh; if(al12_soh_SRC != null || al12_soh_SRC != undefined){ al12_soh = parseFloat(al12_soh_SRC[3]) }else{ al12_soh = 0}
          let al12_mos_SRC = data_rows.filter(al12_mos_S => al12_mos_S[0] == "nK8sqMAeQHY")[0];  // al12_mos
          let al12_mos; if(al12_mos_SRC != null || al12_mos_SRC != undefined){ al12_mos = parseFloat(al12_mos_SRC[3]) }else{ al12_mos = 0}
          let al18_soh_SRC = data_rows.filter(al18_soh_S => al18_soh_S[0] == "qnZmg5tNSMy.rPAsF4cpNxm")[0];  // al18_soh
          let al18_soh; if(al18_soh_SRC != null || al18_soh_SRC != undefined){ al18_soh = parseFloat(al18_soh_SRC[3]) }else{ al18_soh = 0}
          let al18_mos_SRC = data_rows.filter(al18_mos_S => al18_mos_S[0] == "ZcngDQJKiEg")[0];  // al18_mos
          let al18_mos; if(al18_mos_SRC != null || al18_mos_SRC != undefined){ al18_mos = parseFloat(al18_mos_SRC[3]) }else{ al18_mos = 0}
          let al24_soh_SRC = data_rows.filter(al24_soh_S => al24_soh_S[0] == "gVp1KSFI69G.rPAsF4cpNxm")[0];  // al24_soh
          let al24_soh; if(al24_soh_SRC != null || al24_soh_SRC != undefined){ al24_soh = parseFloat(al24_soh_SRC[3]) }else{ al24_soh = 0}
          let al24_mos_SRC = data_rows.filter(al24_mos_S => al24_mos_S[0] == "wOKbEd8Dbi3")[0];  // al24_mos
          let al24_mos; if(al24_mos_SRC != null || al24_mos_SRC != undefined){ al24_mos = parseFloat(al24_mos_SRC[3]) }else{ al24_mos = 0}
          let act_mos_SRC = data_rows.filter(act_mos_S => act_mos_S[0] == "lHPLS1G5CUc")[0]; // act_mos        
          let act_mos; if(act_mos_SRC != null || act_mos_SRC != undefined){ act_mos = parseFloat(act_mos_SRC[3]) }else{ act_mos = 0}
          ou_row.push(name, code, rr_p, otrr_p, al6_soh, al6_mos, al12_soh, al12_mos, al18_soh, al18_mos, al24_soh, al24_mos, act_mos)
          reply.rows.push(ou_row)
        })
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        // return sc
        return reply
    } catch (er) {
        return {error: true, ...er}
    }
}


let fetchSP = async (ou,level,pe) => {
    let {url, default_org_unit, default_org_unit_level, default_period} = endpoints.filter(ept => ept.id == "county__sulphadoxine_pyrimethamine")[0]
    let defaults = {default_pe: default_period, default_ou: default_org_unit, default_lvl: default_org_unit_level}
    let query = {pe, ou, level}
    try {
        let final_url = appendQueriesToUrl(url, query, defaults)
        let sc = await justFetch(final_url)
        return sc
    } catch (er) {
        return {error: true, ...er}
    }
}


let fetchRDT = async (ou,level,pe) => {
    let {url, default_org_unit, default_org_unit_level, default_period} = endpoints.filter(ept => ept.id == "county__rapid_diagnostic_tests")[0]
    let defaults = {default_pe: default_period, default_ou: default_org_unit, default_lvl: default_org_unit_level}
    let query = {pe, ou, level}
    try {
        let final_url = appendQueriesToUrl(url, query, defaults)
        let sc = await justFetch(final_url)
        return sc
    } catch (er) {
        return {error: true, ...er}
    }
}



let fetchAllSS = async (ou,level,pe) => {
    let {url, default_org_unit, default_org_unit_level, default_period} = endpoints.filter(ept => ept.id == "county__all_commodities")[0]
    let defaults = {default_pe: default_period, default_ou: default_org_unit, default_lvl: default_org_unit_level}
    let query = {pe, ou, level}
    try {
        let final_url = appendQueriesToUrl(url, query, defaults)
        let sc = await justFetch(final_url)
        return sc
    } catch (er) {
        return {error: true, ...er}
    }
}

module.exports = {fetchAS, fetchAL, fetchSP, fetchRDT, fetchAllSS, appendQueriesToUrl}
