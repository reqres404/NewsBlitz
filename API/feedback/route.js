import express from "express";
import { sendFeedback } from "./controller/feedbackController.js";

const feedBackRouter = express.Router();

feedBackRouter.post("/", sendFeedback)


export default feedBackRouter