import express from 'express'
import mongoose from "mongoose"
import dotenv from 'dotenv'

import router from "./other stuff/router.js";

dotenv.config()

const port = process.env.PORT || 5000
const db_url = process.env.DB_URL

const app = express()
app.use(express.json())
app.use('/auth', router)

const start = async () => {
    try {
        if (!db_url) {
            throw new Error("база данных не найдена, скорее всего не включена")
        }
        await mongoose.connect(db_url)
        app.listen(port, () => {
            console.log(`сервер работает на порту ${port}`)
        })
    }   catch (e) {
        console.log(e.message)
    }
}

start()