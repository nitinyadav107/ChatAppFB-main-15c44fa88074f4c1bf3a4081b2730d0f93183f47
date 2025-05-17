import { getReceiverSocketId } from "../index.js";
import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { io } from "../index.js";
import axios from "axios"
import dotenv from "dotenv"
dotenv.config();
const ABUSIVE_KEY=process.env.ABUSIVE_KEY
console.log("ABUSIVE_KEY",ABUSIVE_KEY)
export async function checkToxicity(text) {
  try {
    const response = await axios.post(
      `https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze?key=${ABUSIVE_KEY}`,
      {
        comment: { text },
        languages: ['hi'],
        requestedAttributes: {  TOXICITY: {},
        SEVERE_TOXICITY: {},
        INSULT: {},
        THREAT: {},
        PROFANITY: {},
        IDENTITY_ATTACK: {}}
      }
    );
    console.log("API Response:", response.data); // Log the full API response
    const toxicityScore = response.data?.attributeScores?.TOXICITY?.summaryScore?.value || 0;
    console.log("Toxicity Score:", toxicityScore); // Log the toxicity score
    return toxicityScore > 0.1;
  } catch (error) {
    console.error('Toxicity check failed:', error.response?.data || error.message);
    return false; // Allow message if check fails
  }
}

export const sendMessage = async (req, res) => {
  try {
    const { sender_id, message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = sender_id;

       //Check for toxicity
    const isToxic = await checkToxicity(message);
    if (isToxic) {
      return res.status(200).json({success: false, error: "Abusive message not allowed." });
    }

    let conversation = await Conversation.findOne({
      members: { $all: [senderId, receiverId] },
    });
    

    if (!conversation) {
      conversation = await Conversation.create({
        members: [senderId, receiverId],
      });
    }

    const newMessage = await Message.create({
      senderId,
      receiverId,
      message,
    });

    conversation.messages.push(newMessage._id);

    await conversation.save();
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit('newMessage', newMessage);
    }

    res.status(200).json({ message: "Message sent successfully", newMessage });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error);
  }
};

export const getMessage = async (req, res) => {
  try {
    // const { id: receiverId } = req.params;
    const { receiver_id, conversation_id } = req.params;
    const receiverId = receiver_id;
    const senderId = conversation_id;


    const conversation = await Conversation.findOne({
      members: { $all: [senderId, receiverId] },
    }).populate("messages");

    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }

    res.status(200).json({ messages: conversation.messages });
  } catch (error) {
    console.error("Error in getMessage:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//console.log("Message sent successfully");


