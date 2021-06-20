const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')

mongoose.connect( 'mongodb+srv://Tanmay:FicktreeTanmay@146@ficktree.bvlsf.mongodb.net/Disease?retryWrites=true&w=majority',{
    useCreateIndex :true,
    useUnifiedTopology: true,
    useNewUrlParser: true

}).then(()=>{
    console.log('DB IS CONNECTED ')
})


const authRoutes = require('./routes/auth')
const diseaseRoutes = require('./routes/diseases')
// const userRoute = require('./routes')
// middle wares
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())

//Routes here
app.use('/api/',authRoutes)
app.use('/api/',diseaseRoutes)

const port = process.env.PORT || 8080
app.listen(port, ()=> {
    console.log('SERVER IS RUNNING AT',port)
})