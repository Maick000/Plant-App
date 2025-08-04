import jwt from "jsonwebtoken";
import "dotenv/config";

const JWT_SECRET = process.env.JWT_SECRET || "defaultsecret";

export const verifyTokenMiddleware = (req, res, next) => {
  const token =
    req.cookies.accessToken || req.headers.authorization?.split(" ")[1];
  req.session = { user: null };

  if (!token) {
    return res
      .status(401)
      .json([ "Access denied, no token provided." ]);
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.session.user = decoded;
  } catch (error) {
    return res.status(403).json([ "Invalid token." ]);
  }
    next();
};

