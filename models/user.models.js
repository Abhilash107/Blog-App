import mongoose, {Schema} from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },

    fullName: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    }, 

    email: {
        type: String,
        required: true,
        unique:true,
        lowercase: true,
        trim: true,
    },

    password: {
        type: String,
        required: [true, "Password is  required"],
    },

    avatar: {
        type: String,
        required: true
    },

    bio: {
        type:String,
    },

    refreshToken: {
        type: String
    }

}, {timestamps: true})

userSchema.pre("save", async function (next){
    if(!this.isModified("password")){
        return next()
    }
    this.password = await bcrypt.hash(this.password, 10)
    next()
})
// to be continued





