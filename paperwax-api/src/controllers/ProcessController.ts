import { Request, Response } from "express"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export class ProcessController {
    static createProcess = async(req: Request, res: Response) => {
        
    }   

    static getProcess = async(req: Request, res: Response) => {
        try {
            const processes = await prisma.process.findMany({
                include: {
                    product: true, 
                    raw_material: true
                }
            })
            res.json(processes)
        } catch (error) {
            res.status(500).send('Hubo un error obteniendo los procesos')
            return
        }
    }
}