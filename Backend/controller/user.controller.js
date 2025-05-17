import { generateToken } from "../jwt/generateToken.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { sendVerificationEamil, senWelcomeEmail } from "../middleware/Email.js";
import { v2 as cloudinary } from 'cloudinary';
export const signup = async (req, res) => {
  const { fullname, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword)
    return res.status(400).json({ message: "Passwords do not match" });

  try {
    const user = await User.findOne({ email });

    if (user)
      return res.status(201).json({ message: "User already exists", success: false });


    const hashedPassword = await bcrypt.hash(password, 10);
    const verficationToken = Math.floor(100000 + Math.random() * 900000).toString()

    const newUser = new User({
      fullname, email, password: hashedPassword,
      verficationToken,
      verficationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000
    });

    const result = await newUser.save();
    if (newUser) {
      generateToken(result._id, res);



      await sendVerificationEamil(result.email, verficationToken)

      res.status(201).json({ message: "User created successfully", success: true, user: newUser });

    }

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req, res) => {

  const { email, password } = req.body;

  try {

    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(200).json({ message: "Invalid email or password", success: false });
    }


    generateToken(user._id, res);
    const v = user.isVerified;

    if (user.verficationTokenExpiresAt < Date.now() && v === false) {
      const verifyToken = Math.floor(100000 + Math.random() * 900000).toString()
      const newExpiry = Date.now() + 24 * 60 * 60 * 1000;

      user.verificationToken = verifyToken;
      user.verificationTokenExpiresAt = newExpiry;
      await user.save();

    }

    if (v === false) {
      await sendVerificationEamil(user.email, user.verficationToken)
    }

    res.status(200).json({ message: "Login successful", success: true, user: { id: user._id, email: user.email, fullname: user.fullname, image: user.image } });


  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
export const logout = async (req, res) => {
  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "strict",
    secure: true,
  });
  res.status(200).json({ message: "Logged out successfully", success: true });
}
export const getUser = async (req, res) => {

  try {
    const users = await User.find().select("-password");



    if (!users) {
      return res.status(200).json({ message: "Users not found", success: false });
    }

    res.status(200).json({ message: "Users found", success: true, users });

  } catch (error) {
    res.status(400).json({ message: error.message });
  }

}
export const VerfiyEmail = async (req, res) => {
  try {
    const { code, email } = req.body
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ success: false, message: "User not found" })
    }
    if (user.verficationToken !== code || user.verficationTokenExpiresAt < Date.now()) {
      return res.status(400).json({ success: false, message: "Inavlid or Expired Code" })
    }

    user.isVerified = true;
    user.verficationToken = undefined;
    user.verficationTokenExpiresAt = undefined;
    await user.save()
    await senWelcomeEmail(user.email, user.name)
    // const token = generateToken(user._id);
    return res.status(200).json({ success: true, user, message: "Email Verifed Successfully" })


  } catch (error) {
    console.log(error)
    return res.status(400).json({ success: false, message: "internal server error" })
  }
}
export const uploadImage = async (req, res) => {
  try {
    const { id } = req.body;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }
   
    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, { resource_type: 'image' });
    user.image = result.secure_url;
    
    await user.save();
    res.status(200).json({ message: "Image uploaded successfully", success: true, user });
  } catch (error) {
    res.status(400).json({ message: error.message, success: false });
  }

}

export const sendProfileImage = async (req, res) => {
  try {
    const { id } = req.body;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    res.status(200).json({ message: "Image sent successfully", success: true, user });
    }
  catch (error) {
    res.status(400).json({ message: error.message, success: false });
  }
}