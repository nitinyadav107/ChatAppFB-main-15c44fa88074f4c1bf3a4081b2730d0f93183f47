import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1d" });
  res.cookie("jwt", token, { httpOnly: true, sameSite: "strict",secure:true, maxAge: 86400000 });
}
   
 