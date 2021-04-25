import dotenv from 'dotenv'
import axios from "axios"

dotenv.config()

export const api = axios.create({
    baseURL: process.env.BASE_API_URL || 'http://localhost:3001/'
})