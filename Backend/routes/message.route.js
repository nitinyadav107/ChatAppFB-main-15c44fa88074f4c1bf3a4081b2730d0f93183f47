import express from "express";
import { sendMessage, getMessage } from "../controller/message.controller.js";

const MessageRouter = express.Router();

MessageRouter.post("/send/:id", sendMessage);
MessageRouter.get("/get/:receiver_id/:conversation_id", getMessage);


export default MessageRouter;

