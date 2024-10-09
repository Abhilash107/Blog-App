import mongoose, {Schema} from "mongoose";
import {User} from '../models/user.models.js'

const postSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    tags: {
        type: String,
    },
    coverImage: {
        type:String,
        required: true,
    },
    likesCount: {
        type: Number,
        default: 0,
    },
    commentsCount: {
        type: Number,
        default: 0,
    },
    status: {
        type: String,
        default: "published"
    },
    views: {
        type: Number,
        default: 0,
    },
    

},{timestamps: true})

export const Post = mongoose.model("Post", postSchema);