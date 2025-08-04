import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    match: [/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"],
    minlength: 3
    },
  username: {
    type: String,
    required: true,
    trim: true,
    match: [/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"],
    minlength: 3, 
    maxlength: 20 
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, "Invalid email format"]
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 60,
    match: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/, "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"]
  },
});

const User = mongoose.model("User", userSchema);
export default User;
