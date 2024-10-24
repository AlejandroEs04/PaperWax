import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"
import RollMaterial, { RollMaterialCreate } from "../models/RollMaterial"

const prisma = new PrismaClient()

export class RollMaterialController {
    static createRollMaterial = async(req: Request, res: Response) => {
        const rollMaterial : RollMaterialCreate = new RollMaterial(req.body)

        try {
            await prisma.rollMaterial.create({
                data: rollMaterial
            })

            res.send('Rollo registrado correctamente')
        } catch (error) {
            console.log(error)
            res.status(500).send('Hubo un error registrando el rollo')
        }
    }

    static getAllRollMaterial = async(req: Request, res: Response) => {
        try {
            const rolls = await prisma.rollMaterial.findMany({
                include: {
                    material: {
                        select: {
                            name: true
                        }
                    }, 
                    paper: {
                        select: {
                            name: true
                        }
                    }
                }
            })
            res.json(rolls)
        } catch (error) {
            console.log(error)
            res.status(500).send('Hubo un error obteniendo los rollos')
        }
    }
}