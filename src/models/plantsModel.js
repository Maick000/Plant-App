import mongoose from "mongoose";
import { minLength } from "zod";

const plantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minLength: 1,
        maxLength: 100
    },
    family: {
        type: String,
        required: true,
        trim: true,
        minLength: 1,
        maxLength: 100
    },
    description: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 300
    },
    adquisitionDate: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});

const Plant = mongoose.model("Plant", plantSchema);
export default Plant;