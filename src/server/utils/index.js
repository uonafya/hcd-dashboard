let DHIS_USERNAME = process.env.DHIS_USERNAME
let DHIS_PASSWORD = process.env.DHIS_PASSWORD
let APP_ENV = process.env.APP_ENV

let justFetch = async (endpoint, postoptions) => {
    if(endpoint.search("dataStore") < 1 ){ //do not append this for dataStore requests
        endpoint+="&displayProperty=NAME&outputIdScheme=UID"
    }
    if(endpoint == null || endpoint.length < 4){return {error: true, type: 'url', message: 'Invalid endpoint URL'}}
    let options = postoptions || {}
    let req_method = options.method || "GET" //PUT //POST //DELETE etc.
    let req_hd = {}
    let headers = {}
    if(APP_ENV == "dev" || APP_ENV == "development"){
        headers.authorization = "Basic "+Buffer.from(DHIS_USERNAME+":"+DHIS_PASSWORD).toString('base64')
    }
    req_hd.headers = headers
    req_hd.method = req_method
    //body for POST/PUT requests
    if(req_method != "GET"){
        req_hd.body = JSON.stringify(options.body) //Stringify here, not in source
    }
    //body for POST/PUT requests
    
    try {
        let result = await fetch(endpoint, req_hd)
        let result_json = await result.json()
        if(result_json.status === "ERROR"){
            throw result_json
        }
        return result_json
    } catch (err) {
        return {error: true, ...err}
    }
}

let appendQueriesToUrl = (url, query, defaults) => {
    let {pe, ou, level} = query
    let {default_pe, default_ou, default_lvl} = defaults

    let query_append = ``
    if(pe != null && pe != ''){query_append+=`&dimension=pe:${pe}`}else{query_append+=`&dimension=pe:${default_pe}`}
    if(ou != null && ou != ''){query_append+=`&dimension=ou:${ou}`}else{query_append+=`&dimension=ou:${default_ou}`}
    if(level != null && level != '' && level != 0 && level != '~'){query_append+=`;LEVEL-${level}` } else{ if(default_lvl != null && default_lvl != '' && default_lvl != '~'){query_append+=`;LEVEL-${default_lvl}`} }

    url+=query_append
    return url
}

let getApiDocs = (rttr) => {
    let all_ends=[]
    rttr.stack.forEach(print.bind(null, []))
    return all_ends

    //docs fxns
        function print(path, layer) {
            if (layer.route) {
                layer.route.stack.forEach(print.bind(null, path.concat(split(layer.route.path))))
            } else if (layer.name === 'router' && layer.handle.stack) {
                layer.handle.stack.forEach(print.bind(null, path.concat(split(layer.regexp))))
            } else if (layer.method) {
                let ele = {}
                ele._method = layer.method.toUpperCase()
                // ele._path = path.concat(split(layer.regexp)).filter(Boolean).join('/')
                ele._path = '/'+path.concat(split(layer.regexp)).filter(Boolean).join('/')
                // all_ends.push(`${layer.method.toUpperCase()} -> ${path.concat(split(layer.regexp)).filter(Boolean).join('/')}`)
                all_ends.push(ele)
            }
        }
        function split(thing) {
                if (typeof thing === 'string') { return thing.split('/') } else if (thing.fast_slash) { return '' } else {
                    var match = thing.toString().replace('\\/?', '').replace('(?=\\/|$)', '$').match(/^\/\^((?:\\[.*+?^${}()|[\]\\\/]|[^.*+?^${}()|[\]\\\/])*)\$\//)
                    return match ? match[1].replace(/\\(.)/g, '$1').split('/') : '<complex:' + thing.toString() + '>'
                }
        }
    //docs fxns
}

module.exports = {justFetch, appendQueriesToUrl, getApiDocs}