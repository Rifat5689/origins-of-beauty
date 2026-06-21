import express from 'express' 
import cors from 'cors'
import  
const app = express() ; 
const port = process.env.PORT || 3000  ; 

app.use(express.json()) ; 
app.use(cors()) ; 
app.use(helmet());
app.use(cookieParser());

app.listen(()=>{console.log('the app is running on ', port) });


export default app ; 

