import express from "express";
import { getALLNews } from "./controllers/newsController.js";
const newsRouter = express.Router()

newsRouter.get("/", getALLNews)

export default newsRouter