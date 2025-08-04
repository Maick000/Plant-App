import User from "../models/userModel.js";
import { hashPassword, comparePassword } from "../libs/passwordService.js";
import { generateToken, cookieOptions } from "../libs/authService.js";

export const register = async (req, res) => {
  const { name, username, email, password } = req.body;

  try {
    if (!name || !username || !email || !password) {
      return res.status(400).json(["All fields are required"]);
    }

    const hashedPassword = await hashPassword(password);

    const newUser = new User({
      name,
      username,
      email,
      password: hashedPassword,
    });
    const userSaved = await newUser.save();
    const token = await generateToken(userSaved);

    res.status(201).cookie("accessToken", token, cookieOptions).send({
      id: userSaved._id,
      name: userSaved.name,
      username: userSaved.username,
      email: userSaved.email,
    });
  } catch (error) {
    if (error?.code === 11000 && error?.keyPattern?.email === 1) {
      return res.status(400).json(["Email already exists"]);
    }

    return res.status(500).json(error.message);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json(["Email and password are required"]);
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json(["User not found"]);
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json(["User or password incorrect"]);
    }

    const token = await generateToken(user);

    return res
      .status(200)
      .cookie("accessToken", token, cookieOptions)
      .json(["User logged in successfully"]);
  } catch (error) {
    return res.status(500).json([error.message]);
  }
};

export const logout = (req, res) => {
  return res
    .clearCookie("accessToken")
    .status(200)
    .json(["User logged out successfully"]);
};

export const profile = async (req, res) => {
  const { user } = req.session;
  if (!user) {
    return res.status(403).json(["Unauthorized"]);
  }

  const userFound = await User.findById(user.id);
  if (!userFound) {
    return res.status(400).json(["User not found"]);
  }

  return res.status(200).json({
    id: userFound._id,
    name: userFound.name,
    username: userFound.username,
    email: userFound.email,
  });
};

export const getProfile = async (req, res) => {
  const { id } = req.params;
  const { user } = req.session;
  if (!user) {
    return res.status(403).json(["Unauthorized"]);
  }

  try {
    const userFound = await User.findById(id);
    if (!userFound) {
      return res.status(404).json(["User not found"]);
    }
    return res.status(200).json({
      id: userFound._id,
      name: userFound.name,
      username: userFound.username,
      email: userFound.email,
    });
  } catch (error) {
    return res.status(500).json(["Error fetching user profile"]);
  }
};

export const updateProfile = async (req, res) => {
  const { id } = req.params;
  const { name, username, email } = req.body;
  if (req.body.password || req.body.password !== undefined) {
    return res.status(400).json(["Password cannot be updated here"]);
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, username, email },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json(["User not found"]);
    }
    return res.status(200).json({
      user: updatedUser,
    });
  } catch (error) {
    if (error?.code === 11000 && error?.keyPattern?.email === 1) {
      return res.status(400).json(["Email already exists"]);
    }
    return res.status(400).json(["Error updating profile"]);
  }
};
