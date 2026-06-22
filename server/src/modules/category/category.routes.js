import { Router } from "express";
import { categoryById, createCategory } from "./category.controller";






const categoryRouter= Router() ; 

categoryRouter.route("/").post(createCategory) ; 
categoryRouter.route("/:id").post(categoryById) ; 

export default categoryRouter ; 