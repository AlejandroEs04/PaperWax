import { isAxiosError } from "axios";
import api from "../lib/axios";

export async function getMaterials() {
    try {
        const { data } = await api('/raw-material')
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}