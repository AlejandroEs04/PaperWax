import axios from "axios"

const api = axios.create({
    baseURL: `https://paperwax.onrender.com/api`
})

export default api