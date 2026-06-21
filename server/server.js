import dotenv from 'dotenv' 
dotenv.config({ path:'.env'});
import connectDB from './src/config/db.js';
import app from './src/app.js';

connectDB() ; 








