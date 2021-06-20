const express = require('express')
const { check } = require('express-validator')
const { singin, singout, singup } = require('../controlers/auth')
const router = express.Router()

router.post('/singup',[
    check('username').isLength({min:2 ,max: 20}).withMessage('username is atlest 2 char long'),
    check('password').isLength({min: 5}).withMessage('Password must be at least 3 chars long')
    .matches(/\d/).withMessage('must contain a number')
],singup)

router.post('/singin',[
    check('username').isLength({min:1 ,max: 20}).withMessage('Email is required*'),
    check('password').isLength({ min: 5}).withMessage('Password must be at least 3 chars long')
],singin)

router.get('/signout',singout)

module.exports = router