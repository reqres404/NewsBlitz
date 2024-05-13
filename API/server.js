const express = require('express')
const cors = require('cors');
const newsRoute = require("./routes/newsRoute")

const app = express()

app.use(cors())
app.use(express.json())


app.use((req,res,next)=>{
    console.log(req.path,req.method)
    next();
})

app.use("/api",newsRoute)

const PORT = 4000

app.listen(PORT,()=>{
    console.log(`Server Listening on port : ${PORT}`)
})