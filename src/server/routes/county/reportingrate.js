let express = require('express');
let router = express.Router()
let {getApiDocs} = require('../../utils/index')
let {fetchrrtrend, fetchlastestrr, fetchfacilityrr, fetchsubcountyrr} = require('../../middleware/county/reportingrate.js')

router.get('/', (req, res) => {
    let docs = getApiDocs(router)
    res.json(docs)
})

router.get('/trend/:ou?/:level?/:pe?', async (req, res) => {
    let {ou, level, pe } = req.params
    let fetchedData = await fetchrrtrend(ou,level,pe)
    res.json({ fetchedData});
});
router.get('/latesttrend/:ou?/:level?/:pe?', async (req, res) => {
    let {ou, level, pe } = req.params
    let fetchedData = await fetchlastestrr(ou,level,pe)
    res.json({ fetchedData});
});
router.get('/facility/:ou?/:level?/:pe?', async (req, res) => {
    let {ou, level, pe } = req.params
    let fetchedData = await fetchfacilityrr(ou,level,pe)
    res.json({ fetchedData});
});
router.get('/subcounty/:ou?/:level?/:pe?', async (req, res) => {
    let {ou, level, pe } = req.params
    let fetchedData = await fetchsubcountyrr(ou,level,pe)
    res.json({ fetchedData});
});
module.exports = router;