let express = require('express');
let router = express.Router()
let {fetchpendingshipment, postpendingshipment} = require('../../middleware/national/pendingshipment.js')

router.get('/', async (req, res) => {
    let fetchedData = await fetchpendingshipment()
    res.json({ fetchedData});
});

router.post('/', async (req, res) => { //likely unnecessary
    let fetchedData = await postpendingshipment(options)
    res.json({ fetchedData});
});

router.put('/', async (req, res) => {
    let fetchedData = await postpendingshipment(options)
    res.json({ fetchedData});
});

module.exports = router;