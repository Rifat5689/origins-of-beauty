import User from "../modules/user/user.model"
import ApiError from "./ApiError";

const generateAccessAndRefreshToken = async (id) =>
{
const user = await User.findById(id)  ; 
     if(!user) throw new ApiError(500, "something went wrong while generating access and refreshToken") ; 
    const accessToken = await  user.generateAccessToken() ; 
    const refreshToken =await  user.generateRefreshToken() ; 
    user.refreshToken = refreshToken  ; 
   await  user.save({ validateBeforeSave: false }) ; 
    return {accessToken , refreshToken} ; 

}
export {generateAccessAndRefreshToken} ; 