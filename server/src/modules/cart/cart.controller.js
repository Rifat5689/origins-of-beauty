import ApiError from "../../utils/ApiError";
import { ApiResponse } from "../../utils/ApiResponse";
import { asyncHandler } from "../../utils/asyncHandler";
import { Cart } from "./cart.model";

const createCart = asyncHandler(async(req,res) =>{


    const {productId , quantity  } = req.body ; 
    const userId = req.user._id ; 
    
        const productItem = {
            productId, 
            quantity 
        }
        if (!userId || !productId || !quantity)  throw new ApiError(400, "All fields are required."); 
        if (quantity < 1) throw new ApiError(400, "Quantity must be at least 1."); 
    
    const existingCart = await Cart.findOne({userId}) ; 

    if(!existingCart) {

     let cart  = await Cart.create({
        userId , 
        items :[productItem]
    })
    cart = await Cart.findOne({userId}).populate("items.productId") ; 

    return res.status(201).json(
        new ApiResponse(201, cart , "cart created successfully")  
    )
    }
  
    
     const existingItem  = existingCart.items.find(item  => item.productId.equals(productId) ) ; 
     if(existingItem) 
     { 
         existingItem.quantity = quantity ; 
         

     }

     else {

        existingCart.items.push({
            productId , 
            quantity 
        })
     }
     await existingCart.save() ; 
     const updatedCart = await Cart.findOne({userId}).populate("items.productId")
     return res.status(200).json(
        new ApiResponse(200, updatedCart , "Cart updated successfully")  
    )

       
            
    

     
})

const getCart = asyncHandler(async(req, res)=>{
     
    const userId = req.user._id ; 
    const  cart =await Cart.findOne({userId}).populate("items.productId")  ;
    if(!cart) return res.status(200).json(
        new ApiResponse(200 , [], "Cart is empty" ) 
    )
    return res.stauts(200).json(
        new ApiResponse(200,cart , "Cart sent successfully") 
    )

})

export {createCart , getCart} ; 