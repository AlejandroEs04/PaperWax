import { isAxiosError } from "axios";
import api from "../lib/axios";
import { PaperType } from "../types";

export async function getPapers() {
    try {
        const { data } = await api<PaperType[]>('/papers')
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}