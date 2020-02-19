let express = require('express');
let router = express.Router()
let {fetchnationalsummary } = require('../../middleware/national/nationalsummary.js')

router.get(':ou?/:level?/:pe?', async (req, res) => { //TODO: set constant National OU
    let {ou, level, pe } = req.params
    let fetchedData = await fetchnationalsummary(ou,level,pe)
    res.json({ fetchedData});
});

module.exports = router;