let endpoints = require('../static/endpoints')
let {justFetch} = require('../utils/index')
let DHIS_BASE_API_URL = process.env.DHIS_BASE_API_URL

let fetchDefaults = async () => {
    let date = new Date()
    let url = endpoints.filter(ept => ept.id == "all__user_details")[0].url
    try {
        let sc = await justFetch(url)
        sc.level = 0
        let def_yr = date.getFullYear()
        let def_mnth = date.getMonth() + 1
        if(def_mnth < 10){def_mnth = "0"+def_mnth}
        let def_prd = def_yr+""+def_mnth
        sc.period = def_prd
        return sc
    } catch (err) {
        return {error: true, ...err}
    }
}

let fetchCounties = async () => {
    let url = endpoints.filter(ept => ept.id == "all__counties_list")[0].url
    try {
        let sc = await justFetch(url)
        return sc
    } catch (err) {
        return {error: true, ...err}
    }
}

let fetchSubcounties = async () => {
  let url = endpoints.filter(ept => ept.id == "all__subcounties_list")[0].url
  try {
    let sc = await justFetch(url)
    return sc
  } catch (er) {
    return {error: true, ...er}
  }
}

let fetchWards = async () => {
  let url = endpoints.filter(ept => ept.id == "all__wards_list")[0].url
  try {
    let sc = await justFetch(url)
    return sc
  } catch (er) {
    return {error: true, ...er}
  }
}

let fetchFacilities = async () => {
  let url = endpoints.filter(ept => ept.id == "all__facilities_list")[0].url
  try {
    let sc = await justFetch(url)
    return sc
  } catch (er) {
    return {error: true, ...er}
  }
}

let fetchCUs = async () => {
  let url = endpoints.filter(ept => ept.id == "all__cus_list")[0].url
  try {
    let sc = await justFetch(url)
    return sc
  } catch (er) {
    return {error: true, ...er}
  }
}

let fetchMFLcodes = async () => {
  let url = endpoints.filter(ept => ept.id == "all__mfl_codes")[0].url
  try {
    let sc = await justFetch(url)
    return sc
  } catch (er) {
    return {error: true, ...er}
  }
}

let fetchCommodities = async () => {
  let url = endpoints.filter(ept => ept.id == "all__commodities")[0].url
  try {
    let sc = await justFetch(url)
    return sc
  } catch (er) {
    return {error: true, ...er}
  }
}

let fetchOrgUnitDetails = async (ouid) => {
    if(ouid != null && ouid != ''){
      let url = `${DHIS_BASE_API_URL}/organisationUnits/${ouid}.json`
      try {
          let sc = await justFetch(url)
          return sc
      } catch (err) {
          return {error: true, ...err}
        }
      }else{
        return {error: true, message: 'Please provide a valid org. unit ID'}
    }
}

let fetchMCFOUs = async () => {
    let url = `${DHIS_BASE_API_URL}/dataSets.json?fields=id,name,organisationUnits[id,code,name]&filter=id:ilike:JPaviRmSsJW&paging=false`
    try {
        let sc = await justFetch(url)
        return sc
    } catch (err) {
        return {error: true, ...err}
    }
}

module.exports = {fetchCounties, fetchSubcounties, fetchWards, fetchFacilities, fetchMFLcodes, fetchCUs, fetchCommodities, fetchDefaults, fetchOrgUnitDetails, fetchMCFOUs}
