import { Request, Response } from "express"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export class ProcessController {
    static createProcess = async(req: Request, res: Response) => {
        
    }   
}