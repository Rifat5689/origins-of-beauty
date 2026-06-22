
import jwt from "jsonwebtoken"
import { asyncHandler } from "../utils/asyncHandler.js"
import ApiError from "../utils/ApiError.js";
import User from "../modules/user/user.model.js";


const verifyJwt = asyncHandler(async(req,res,next) =>
{
     const token = req.cookies?.accessToken || req.headers["authorization"]?.replace("Bearer ","") ; 
   if(!token) throw new ApiError(401 , "Unauthorized") ; 
   let decodedToken ; 
try {
   decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
} catch (err) {
  if (err.name === "TokenExpiredError") throw new ApiError(401, "Token expired");
  throw new ApiError(401, "Invalid token");
}
   const {_id} = decodedToken  ; 
   const user = await User.findById(_id) ;
   if(!user) throw new ApiError(401, "Invalid Token") ; 

   req.user = user ; 
   next () ; 
})
export {verifyJwt}