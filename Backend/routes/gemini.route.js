import express from "express";
import { gemini } from "../controller/gemini.controller.js";

const geminiRouter = express.Router();

geminiRouter.post("/gemini",gemini)

export default geminiRouter;