import axios from "axios"

const baseApiUrl = 'http://localhost:3001/'

export const api = axios.create({
    baseURL: baseApiUrl
})