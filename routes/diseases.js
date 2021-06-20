const express = require('express')
const { addDisease, getDisease, search, searchDic } = require('../controlers/diseases')
const router = express.Router()

router.post('/add/disease',addDisease)

router.get('/get/diseases',getDisease)

router.get('/:search',search)

router.get('/disease/:name',searchDic)

module.exports = router