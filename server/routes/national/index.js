let express = require('express');
let router = express.Router()
let {getApiDocs} = require('../../utils/index')

router.get('/', (req, res) => {
    let docs = getApiDocs(router)
    res.json(docs)
})

router.use('/summary', require('./nationalsummary'))
router.use('/allmalariacommodities', require('./allmalariacommodities'))
router.use('/pendingshipment', require('./pendingshipment'))
router.use('/issuesvsrecipts', require('./nationalissuesvsrecipts'))


module.exports = router;