import jwt from "jsonwebtoken";
import "dotenv/config";
import User from "../models/userModel.js";

const JWT_SECRET = process.env.JWT_SECRET || "defaultsecret";

export const verifyAndCompare = async (req, res) => {
  const {accessToken} = req.cookies

  if(!accessToken) return res.status(401).json(["Unauthorized"])

  jwt.verify(accessToken, JWT_SECRET, async (err, user) =>{
    if (err) return res.status(401).json(["Unauthorized"])
    
    const userFound = await User.findById(user.id)
    if (!userFound) return res.status(401).json(["Unauthorized"])

    return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
    })
  })
}