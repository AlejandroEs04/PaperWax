import { isAxiosError } from "axios";
import api from "../lib/axios";
import { ProductType } from "../types";

export async function getProcess() {
    try {
        const { data } = await api<ProductType[]>('/process')
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}