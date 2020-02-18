let express = require('express');
let router = express.Router()
let {getApiDocs} = require('../../utils/index')
let {fetchSupplychaintrend, fetchSupplychainsummary} = require('../../middleware/county/supplychain')

router.get('/', (req, res) => {
    let docs = getApiDocs(router)
    res.json(docs)
})

router.get('/indicatorsummary/:ou?/:level?/:pe?', async (req, res) => {
    let {ou, level, pe } = req.params
    let fetchedData = await fetchSupplychainsummary(ou,level,pe)
    res.json({ fetchedData});
});
router.get('/indicatortrends/:ou?/:level?/:pe?', async (req, res) => {
    let {ou, level, pe } = req.params
    let fetchedData = await fetchSupplychaintrend(ou,level,pe)
    res.json({ fetchedData});
});

module.exports = router;