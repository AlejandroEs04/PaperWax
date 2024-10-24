import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"
import RawMaterial, { RawMaterialCreate } from "../models/RawMaterial"

const prisma = new PrismaClient()

export class RawMaterialController {
    static createRawMaterial = async(req: Request, res: Response) => {
        const rawMateria : RawMaterialCreate = new RawMaterial(req.body)

        try {
            await prisma.rawMaterial.create({
                data: rawMateria
            })
            res.send('Material registrado correctamente')
        } catch (error) {
            res.status(500).send('Hubo un error registrando el material')
            return
        }
    }
    
    static getAllRawMaterial = async(req: Request, res: Response) => {
        try {
            const rawMaterials = await prisma.rawMaterial.findMany()
            res.json(rawMaterials)
        } catch (error) {
            res.status(500).send('Hubo un error obteniendo los materiales')
            return
        }
    }
}