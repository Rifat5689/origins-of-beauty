import express from 'express' 
import cors from 'cors'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import { router as userRouter } from './modules/user/user.routes.js';
import { createCategory } from './modules/category/category.controller.js';
import categoryRouter from './modules/category/category.routes.js';
const app = express() ; 
const port = process.env.PORT || 4000  ; 

app.use(express.json()) ; 
app.use(express.urlencoded({ extended: true }));


const allowedOrigins = ["http://localhost:5173", "https://yourdomain.com"];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));


app.use(helmet());
app.use(cookieParser());

///api routes 

app.use("/api/v1/users",userRouter) ;
app.use("/category",categoryRouter) ; 







app.use((err, req, res,next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || "Internal Server Error"

    console.error(`[ERROR] ${req.method} ${req.originalUrl}:`, err)

    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
        errors: err.errors || [],
        // SECURITY: Stack trace only in development to prevent info leakage in production
       
    })
})

app.listen(port , ()=>{console.log('the app is running on ', port) });

export default app ; 
