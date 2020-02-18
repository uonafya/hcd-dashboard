let express = require('express');
let router = express.Router()
let {getApiDocs} = require('../utils/index')
let {fetchCounties, fetchSubcounties, fetchWards, fetchFacilities, fetchMFLcodes, fetchCUs, fetchCommodities, fetchDefaults} = require('../middleware/common')

router.get('/', (req, res) => {
    let docs = getApiDocs(router)
    res.json(docs)
})

router.get('/defaults', async (req, res) => {
    let fetchedData = await fetchDefaults()
    res.json({fetchedData});
});

router.get('/counties', async (req, res) => {
    let fetchedData = await fetchCounties()
    res.json({fetchedData});
});

router.get('/subcounties', async (req, res) => {
    let fetchedData = await fetchSubcounties()
    res.json({fetchedData});
});

router.get('/wards', async (req, res) => {
    let fetchedData = await fetchWards()
    res.json({fetchedData});
});

router.get('/facilities', async (req, res) => {
    let fetchedData = await fetchFacilities()
    res.json({fetchedData});
});

router.get('/commodities', async (req, res) => {
    let fetchedData = await fetchCommodities()
    res.json({fetchedData});
});

router.get('/community-units', async (req, res) => {
    let fetchedData = await fetchCUs()
    res.json({fetchedData});
});

router.get('/mfl-codes', async (req, res) => {
    let fetchedData = await fetchMFLcodes()
    res.json({fetchedData});
});

module.exports = router;