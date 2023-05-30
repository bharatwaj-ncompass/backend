const express = require("express")
const cors = require("cors")
const app = express()
const { router } = require('./routes/routes')
const port = 3001
app.use(express.json())

//routes
app.use('/user',cors(),router)

app.listen(port, ()=>{
    console.log("Database connection is Ready and Server is Listening on Port", port);
})