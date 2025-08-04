import jwt from "jsonwebtoken";
import "dotenv/config";

const JWT_SECRET = process.env.JWT_SECRET || "defaultsecret";

export const generateToken = (user) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { id: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) reject(err);
        else resolve(token);
      }
    );
  });
};

// Cookie options for secure token storage
export const cookieOptions = {
  httpOnly: false, // true (for production)
  secure: true, // process.env.NODE_ENV === "production" (for production)
  sameSite: "none", // "strict" (for production)
  maxAge: 1000 * 60 * 60,
};
