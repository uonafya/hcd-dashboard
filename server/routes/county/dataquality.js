let express = require('express');
let router = express.Router()
let {getApiDocs, } = require('../../utils/index')
let {fetchDefaults} = require('../../middleware/common')
let {fetchCompleteness, fetchComparison, fetchConcordance, fetchConsistency} = require('../../middleware/county/dataquality')

router.get('/', (req, res) => {
    let docs = getApiDocs(router)
    res.json(docs)
})

router.get('/completeness/:ou?/:level?/:pe?', async (req, res) => {
    let {ou, level, pe } = req.params
    let defaults = await fetchDefaults() 
    if(ou === undefined || ou === null || ou === " " || ou === '~'){ou = defaults.dataViewOrganisationUnits[0].id}
    if(level === undefined || level === null || level === " " || level === '~'){level = defaults.level}
    if(pe === undefined || pe === null || pe === " " || pe === '~'){pe = defaults.period}
    let fetchedData = await fetchCompleteness(ou,level,pe) 
    res.json({ fetchedData});
});

router.get('/concordance/:ou?/:level?/:pe?', async (req, res) => {
    let {ou, level, pe } = req.params
    let defaults = await fetchDefaults() 
    if(ou === undefined || ou === null || ou === " " || ou === '~'){ou = defaults.dataViewOrganisationUnits[0].id}
    if(level === undefined || level === null || level === " " || level === '~'){level = defaults.level}
    if(pe === undefined || pe === null || pe === " " || pe === '~'){pe = defaults.period}
    let fetchedData = await fetchConcordance(ou,level,pe)
    res.json({ fetchedData});
});

router.get('/consistency/:ou?/:level?/:pe?', async (req, res) => {
    let {ou, level, pe } = req.params
    let defaults = await fetchDefaults() 
    if(ou === undefined || ou === null || ou === " " || ou === '~'){ou = defaults.dataViewOrganisationUnits[0].id}
    if(level === undefined || level === null || level === " " || level === '~'){level = defaults.level}
    if(pe === undefined || pe === null || pe === " " || pe === '~'){pe = defaults.period}
    let fetchedData = await fetchConsistency(ou,level,pe)
    res.json({ fetchedData});
});

router.get('/comparison/:ou?/:level?/:pe?', async (req, res) => {
    let {ou, level, pe } = req.params
    let defaults = await fetchDefaults() 
    if(ou === undefined || ou === null || ou === " " || ou === '~'){ou = defaults.dataViewOrganisationUnits[0].id}
    if(level === undefined || level === null || level === " " || level === '~'){level = defaults.level}
    if(pe === undefined || pe === null || pe === " " || pe === '~'){pe = defaults.period}
    let fetchedData = await fetchComparison(ou,level,pe)
    res.json({ fetchedData});
});

module.exports = router;
