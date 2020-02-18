let express = require('express');
let router = express.Router()
let {getApiDocs} = require('../../utils/index')
let {fetchissuesvsrecipts } = require('../../middleware/county/issuesvsrecipts.js')

router.get(':ou?/:level?/:pe?', async (req, res) => {
    let {ou, level, pe } = req.params
    let fetchedData = await fetchissuesvsrecipts(ou,level,pe)
    res.json({ fetchedData});
});

module.exports = router;