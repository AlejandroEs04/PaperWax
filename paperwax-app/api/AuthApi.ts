import api from "@/lib/axios"
import { UserLogin } from "@/types"
import { isAxiosError } from "axios"

export async function authenticateUser({id, userName, password} : UserLogin) {
    try {
        const { data } = await api('/auth/login')
        console.log(data)

        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}