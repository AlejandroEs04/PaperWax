import { isAxiosError } from "axios";
import api from "../lib/axios";
import { ProcessCreate, ProcessType } from "../types";

export async function getProcess() {
    try {
        const { data } = await api<ProcessType[]>('/process')
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getProcessById(id: number) {
    try {
        const { data } = await api<ProcessType>(`/process/${id}`)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function registerProcess(process: ProcessCreate) {
    try {
        const { data } = await api.post<string>('/process', process)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }  
    }
}

export async function finishProcess(formData: { data: ProcessType, processId: number }) {
    try {
        const { data } = await api.put<string>(`/process/finish/${formData.processId}`, formData.data)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }  
    }
}