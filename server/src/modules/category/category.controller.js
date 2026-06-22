import ApiError from "../../utils/ApiError";
import { ApiResponse } from "../../utils/ApiResponse";
import { asyncHandler } from "../../utils/asyncHandler";
import Category from "./category.model";


const createCategory = asyncHandler(async(req,res) =>{
    const {name} = req.body ; 
    const category = await Category.create({
        name  
    })

    res.status(200).json(new ApiResponse(200,category, "Category created successfully")) ; 

})
const categoryById = asyncHandler(async(req,res) => {
      const {id} = req.params ; 
    const category = await Category.findById(id)  ; 
    if(!category) throw new ApiError(404 , "Category not found") ; 
    res.status(200, category , "category sent successfully") ; 


})

export {createCategory,categoryById} 