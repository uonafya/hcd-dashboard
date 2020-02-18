let express = require('express')            // https://expressjs.com/
let cors  = require('cors');                // https://www.npmjs.com/package/cors
require('isomorphic-unfetch')               // https://www.npmjs.com/package/isomorphic-unfetch
let apicache = require('apicache')          // https://github.com/kwhitley/apicache
let dotenv = require('dotenv').config()     // https://www.npmjs.com/package/dotenv
let favicon = require('serve-favicon')      // https://expressjs.com/en/resources/middleware/serve-favicon.html
let path = require('path')                  // favicon dependency
let cache = apicache.middleware
let PORT = process.env.APP_PORT || 3000

let app = express();
const onlyStatus200 = (req, res) => {       //only cache successful requests greater than 400 bytes
     if(res.statusCode === 200 && res.get('Content-Length') > 400){
        return true 
    }else{
        return false 
    } 
}
app.use(cache('3 days', onlyStatus200)); // works brilliantly. // LocalForage would be an alternative that supports IndexedDB
app.use(cors());
let {getApiDocs} = require('./utils/index')

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico'))) // app.get('/favicon.ico', (req, res) => res.status(204));

app.get('/', async(req, res) => {
    let docs = getApiDocs(app._router)
    res.json(docs)
    //  res.redirect('/api');
});

app.use('/api', require('./routes/api'));









//error handling (should really use module)
app.use(function (err, req, res, next) {
    res.status(404).json({error: true, message: "An error occured"})
    console.log("Error: "+err)
})
//error handling




app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
});