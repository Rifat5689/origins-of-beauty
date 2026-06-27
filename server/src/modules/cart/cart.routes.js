import { Router } from "express";
import { createCart, getCart } from "./cart.controller";



const cartRouter = Router() ; 

cartRouter.route('/').get(getCart).post(createCart) ; 
export default cartRouter ; 