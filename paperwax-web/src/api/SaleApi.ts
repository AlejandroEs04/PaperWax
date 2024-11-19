import api from "../lib/axios";
import { SaleRegister, SaleType } from "../types";
import { isAxiosError } from "axios";

export async function createSale(sale: SaleRegister) {
    try {
        const { data } = await api.post<string>('/sales', sale)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getSales() {
    try {
        const { data } = await api<SaleType[]>('/sales')
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}