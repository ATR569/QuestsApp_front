import dotenv from 'dotenv'
import axios from "axios"

dotenv.config()

const baseApiUrl = process.env.BASE_API_URL || 'http://localhost:3001'

export const api = axios.create({
    baseURL: baseApiUrl
})