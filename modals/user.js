const mongoose = require('mongoose')
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');
const { Schema } = mongoose

const userSchema = new Schema({
    username:{
        type : String,
        unique: true,
        trim : true,
        required: true,
        maxlength: 25
    },
    ency_password:{
        type: String,
        required:true
    },
    salt : {
        type: String,
        required :true,
        unique : true
    }
},{
    timestamps :true
})

userSchema.virtual('password')
    .set(function(password){
        this._password = password
        this.salt = uuidv4();
        this.ency_password = this.securePassword(password)
    })
    .get(function(){
        return this._password
    })

userSchema.methods = {
    authincate:function(plainpassword){
        return this.securePassword(plainpassword) === this.ency_password
    },
    securePassword : function(password){
        if (!password) {
            return ''
        }
        try{
            return crypto.createHmac('sha256', this.salt)
            .update(password)
            .digest('hex');
        }catch(e){
            return ''
        }
    }
}

module.exports = mongoose.model('User',userSchema)