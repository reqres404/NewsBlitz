import express from "express"
import newsRouter from "./news/route.js" 

const app = express()
app.use(express.json())

const PORT = process.env.PORT || 3000

app.use("/api",newsRouter)

app.get("/health",(req,res)=>{
    res.status(200).json({message:"Healthy server :)"})
})

app.listen(PORT,()=>{
    console.log(`Serve running on PORT: ${PORT}`)
})