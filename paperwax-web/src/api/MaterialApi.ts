import { isAxiosError } from "axios";
import api from "../lib/axios";
import { RawMaterial, RawMaterialCreate, RawMaterialType, RollMaterial } from "../types";

export async function getMaterials() {
    try {
        const { data } = await api<RawMaterial[]>('/raw-material')
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getMaterialTypes() {
    try {
        const { data } = await api<RawMaterialType[]>('/raw-material/types')
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getRolls() {
    try {
        const { data } = await api<RollMaterial[]>('/roll-material')
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function createMaterial(material: RawMaterialCreate) {
    try {
        const { data } = await api.post<string>('/raw-material', material)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        } 
    }
}