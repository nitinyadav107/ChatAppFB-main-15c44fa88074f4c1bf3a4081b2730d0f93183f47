import express from "express";
import { getUser, login,logout,sendProfileImage,signup,uploadImage,VerfiyEmail } from "../controller/user.controller.js";

import upload from "../middleware/multer.js"


const router=express.Router();
router.post("/signup",signup)
router.post("/login",login)
router.get("/getUser",getUser)
router.post('/verifyemail',VerfiyEmail
);

router.post("/logout",logout)
router.post("/uploadImage",upload.single("image"),uploadImage)
router.post("/sendProfileImage",sendProfileImage);



export default router;
