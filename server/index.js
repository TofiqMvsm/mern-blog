const express = require('express')
const cors = require('cors')
const {connect} = require('mongoose')
require('dotenv').config({path : "./config.env"})
const upload = require('express-fileupload')

const userRoutes = require('./routes/userRoutes')
const postRoutes = require('./routes/postRoutes')
const { notFound,errorHandler } = require('./middleware/errorMiddleware')
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cors({credentials : true,origin : "https://mern-blog-1-9tko.onrender.com"}))
app.use(upload())
app.use('/uploads',express.static(__dirname + "/uploads"))


app.use('/api/users',userRoutes)
app.use('/api/posts',postRoutes)

app.use(notFound)
app.use(errorHandler)

connect(process.env.MONGO_URL).then(app.listen(process.env.PORT,()=>{
    console.log(`Hello from the server on PORT ${process.env.PORT}`)
})).catch(error=>{
    console.log(error)
})




