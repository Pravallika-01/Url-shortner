import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
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

app.use(express.json())
app.use('/', allRoutes)

app.listen(PORT, () => {
    console.log(`server running at port ${PORT}`)
})