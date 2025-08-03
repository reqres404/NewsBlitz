import express from "express"
import feedBackRouter from "./feedback/route.js"
import newsRouter from "./news/route.js"
import donateRouter from "./donate/router.js"
import cors from "cors"

const app = express()
app.use(express.json())
app.use(cors());
const PORT = process.env.PORT || 3000

app.use("/api/news", newsRouter)
app.use("/api/feedback", feedBackRouter)
app.use("/api/donate", donateRouter) 

app.get("/health", (req, res) => {
    res.status(200).json({ message: "Healthy server :)" })
})

app.listen(PORT, () => {
    console.log(`Serve running on PORT: ${PORT}`)
})