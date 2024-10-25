import { Request, Response } from "express"
import { PrismaClient } from "@prisma/client"
import Paper, { PaperCreate } from "../models/Paper"

const prisma = new PrismaClient()

export class PaperController {
    static createPaper = async(req: Request, res: Response) => {
        const paper : PaperCreate = new Paper(req.body)

        try {
            await prisma.paper.create({
                data: paper
            })

            res.send('Papel registrado con exito')
        } catch (error) {
            res.status(500).send('Hubo un error al registrar el papel')
            return
        }
    }

    static getAllPapers = async(req: Request, res: Response) => {
        try {
            const papers = await prisma.paper.findMany()
            res.json(papers)
        } catch (error) {
            res.status(500).send('Hubo un error')
            return
        }
    }
}