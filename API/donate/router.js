import express from "express"
import { processDonation } from "./controller/donateController.js"

const router = express.Router()

router.post("/", processDonation)

export default router