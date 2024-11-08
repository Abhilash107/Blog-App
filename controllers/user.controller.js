import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from '../utils/ApiError.js'
import {ApiResponse} from '../utils/ApiResponse.js'
import {User} from '../models/user.models.js'
import {uploadOnCloudinary} from '../utils/cloudinary.js'


// generate access token and refresh tokens
// to achieve this we need a user to register/signUp

const generateAccessAndRefreshToken = async(userId)=>{
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        //save the refreshToken of the user in DB
        user.refreshToken = refreshToken;
        await user.save({validateBeforeSave: false})

        return {accessToken, refreshToken}

    } catch (error) {
        throw new ApiError(500, "Something went wrong")
    }
}

const registerUser = asyncHandler( async (req, res)=>{
    const {fullName, email, username, password} = req.body
    if(
        [fullName, username, email, password].some( (field) =>
        field?.trim() === '')
    ){
        throw new ApiError(400, "All fields are required")
    }
    // check if user exists or not
    const existedUser = await User.findOne({
        $or: [{username}, {email}]
    })
    //* Check for existed user
    if(existedUser){
        throw new ApiError(409,"User with email or username already exists")
    }

    //gte the avatar path
    const avatarLocalPath = req.files?.avatar[0]?.path

    let coverImagePath;
    if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0){
        coverImagePath = req.files.coverImage[0].path
    }
    //check for avatar path
    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar file id required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath) 
    const coverImage = await uploadOnCloudinary(coverImagePath)

    if(!avatar){
        new ApiError(400, "Avatar file is required")
    }
    //create user
    const user = await User.create({
        fullName,
        email,
        password,
        username: username.toLowerCase(),
        avatar: avatar.url,
        coverImage: coverImage?.url || ""

    })

    //Search for above createdUser & remove the password and refreshToken
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )
    //re-check
    if(!createdUser){
        throw new ApiError(500, "Something went wrong while signing up")
    }

    return res
    .status(201)
    .json(
        new ApiResponse(200, createdUser, "User signed up successfully")
    ) 

})