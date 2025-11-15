import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import mongoose from "mongoose"
import userRoutes from './src/routes/user.route.js';
dotenv.config()

const app = express()
app.use(cors({
    origin:process.env.ORIGIN
}))
app.use(express.json())
app.use(express.urlencoded())
app.use('/user', userRoutes)
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

export default app;