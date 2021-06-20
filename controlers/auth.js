const { validationResult } = require("express-validator")//express Validator
const jwt = require('jsonwebtoken')//setting jwt token 
const expressJwt = require('express-jwt')//checking jwt token from client
const User = require("../modals/user")


exports.singup = (req,res)=>{
    const errors = validationResult(req)
    //
    if (!errors.isEmpty()) {
        return res.status(422).json({
            error : errors.array()[0].param,
            msg :errors.array()[0].msg
        })
    }
    //Setting user according to DB
    var user = new User(req.body)
    //Saving in DB
    user.save((err, user)=>{
        if (err || !user) {
            return res.status(400).json({
                error : 'Not able to save in DB*',
                param : err
            })
        }
          //Creating Token
          const token = jwt.sign({_id: user._id},'tanmaysecrtishere')

          //***** Extracting User ***** //
          const { _id,username } = user
  
          //****  Setting in Cookie ******//
          res.cookie("token", token, {expire: new Date() + 9999})
          res.cookie("username", username,{expire: new Date() + 9999})
          //returning responce to client
          return res.json({
              token,
              user:{
                  _id,
                  username,
              }
          })
    })
}

exports.singin = (req,res) =>{
    //Extraction responce
    const {username , password } = req.body

    //Express validation
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({
            error : errors.array()[0].param,
            msg :errors.array()[0].msg
        })
    }

    /****** Finding User & setting token ********/ 
    User.findOne({username},(err,user)=>{

        //Searching email in DB
        if (err || !user) {
            return res.status(400).json({
                error: "username Does not exist"
            })
        }
        //Cheaking password
        if (!user.authincate(password)) {
            return res.status(401).json({
                error : 'username and password dosent match'
            })
        }

        //Creating Token
        const token = jwt.sign({_id: user._id},'tanmaysecrtishere')

        //***** Extracting User ***** //
        const { _id,username} = user

        //****  Setting in Cookie ******//
        res.cookie("token", token, {expire: new Date() + 9999})
        res.cookie("username", username,{expire: new Date() + 9999})

            return res.json({
                token,
                user:{
                    _id,
                    username,
                }
            })
    })
}

//Singout controller
exports.singout = (req,res)=>{
    res.clearCookie('token')
    res.json({
        msg: 'User singout successfully'
    })
}