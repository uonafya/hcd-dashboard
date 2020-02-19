let express = require('express');
let router = express.Router()
let {getApiDocs} = require('../utils/index')

router.get('/', (req, res) => {
    let docs = getApiDocs(router)
    res.json(docs)
})

router.use('/common', require('./common'))
router.use('/dashboard', require('./dashboard'))
router.use('/county', require('./county/index'))
router.use('/national', require('./national/index'))

module.exports = router;