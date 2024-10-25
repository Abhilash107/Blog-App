import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    post:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
    rating: {
        type: Number,
        enum: [1, 2, 3, 4, 5],
        default: 1
    },
    feedbackType: {
        type: String,
        enum: ["suggestion", "praise", "report"],
        default: "suggestion"
    },
    status: {
        type: String,
        enum: ["active", "resolved", "archived"],
        default: "active"
    }
}, {timestamps: true})

export const Feedback = mongoose.model("Feedback", feedbackSchema);