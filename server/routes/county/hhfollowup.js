let express = require('express');
let router = express.Router()
let {getApiDocs} = require('../../utils/index')
let {fetchhhunderstocked, fetchhhoverstocked } = require('../../middleware/county/hhfollowup.js')

router.get('/', (req, res) => {
    let docs = getApiDocs(router)
    res.json(docs)
})

router.get('/understocked/:ou?/:level?/:pe?', async (req, res) => {
    let {ou, level, pe } = req.params
    let fetchedData = await fetchhhunderstocked(ou,level,pe)
    res.json({ fetchedData});
});
router.get('/overstocked/:ou?/:level?/:pe?', async (req, res) => {
    let {ou, level, pe } = req.params
    let fetchedData = await fetchhhoverstocked(ou,level,pe)
    res.json({ fetchedData});
});

module.exports = router;