import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config()

const app = express()
const PORT = process.env.PORT || 8000
const DB_URL = `mongodb+srv://mahesh0911:${process.env.DB_PASSWORD}@cluster0.o9nzlt9.mongodb.net/test`
import allRoutes from './Routes/urlRoutes.js'

mongoose
    .connect(DB_URL)
    .then(() => {
        console.log('database connected')
    })
    .catch((err) => {
        console.log(err)
    })

const corsOptions = {
    origin: "*",
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}

app.options("*", cors());
app.use(cors(corsOptions));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', allRoutes)

app.listen(PORT, () => {
    console.log(`server running at port ${PORT}`)
})