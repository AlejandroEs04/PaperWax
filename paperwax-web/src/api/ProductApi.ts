import { isAxiosError } from "axios";
import api from "../lib/axios";
import { ProductType } from "../types";

export async function getProducts() {
    try {
        const { data } = await api<ProductType[]>('/products')
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}