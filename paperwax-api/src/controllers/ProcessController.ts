import { Request, Response } from "express"
import { PrismaClient } from "@prisma/client"
import Process, { ProcessCreate } from "../models/Process"

const prisma = new PrismaClient()

export class ProcessController {
    static createProcess = async(req: Request, res: Response) => {
        const process : ProcessCreate = new Process(req.body)

        try {
            await prisma.process.create({
                data: {
                    type: process.type, 
                    start_time: process.start_time, 
                    roll_material_id: +process.roll_material_id, 
                    initial_weight: +process.initial_weight, 
                    product_id: +process.product_id
                }
            })
            res.send('Proceso registrado correctamente')
        } catch (error) {
            console.log(error)
            res.status(500).send('Hubo un error registrando el material')
            return
        }
    }   

    static getProcess = async(req: Request, res: Response) => {
        try {
            const processes = await prisma.process.findMany({
                include: {
                    product: true, 
                    roll_material: true
                }
            })
            res.json(processes)
        } catch (error) {
            res.status(500).send('Hubo un error obteniendo los procesos')
            return
        }
    }

    static getProcessById = async(req: Request, res: Response) => {
        const { id } = req.params
        try {
            const process = await prisma.process.findFirst({
                include: {
                    product: true, 
                    roll_material: true
                }, 
                where: {
                    id: +id
                }
            })
            res.json(process)
        } catch (error) {
            res.status(500).send('Hubo un error obteniendo los procesos')
            return
        }
    }

    static finishProcess = async(req: Request, res: Response) => {
        const process : ProcessCreate = new Process(req.body)
        const { id } = req.params

        try {
            const maxIdProduct = await prisma.process.aggregate({
                _max: {
                    finished_product_id: true
                }
            })
            await prisma.process.update({
                where: {
                    id: +id
                },
                data: {
                    finished_product_id: +maxIdProduct._max.finished_product_id + +process.finished_quantity, 
                    finished_quantity: +process.finished_quantity, 
                    end_time: process.end_time, 
                    final_weight: process.final_weight
                }
            })
            res.send('Proceso finalizado correctamente')
        } catch (error) {
            res.status(500).send('Hubo un error obteniendo los procesos')
            return
        }
    }
}