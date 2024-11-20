import { Request, Response } from "express"
import { PrismaClient } from "@prisma/client"
import Process, { ProcessCreate } from "../models/Process"
import formatDate from "../utils/formatDate"
import { Type } from "../types"

const prisma = new PrismaClient()

const isValidType = (type: string): type is Type => { return type.includes(type as Type) }

export class ProcessController {
    static createProcess = async(req: Request, res: Response) => {
        const process : ProcessCreate = new Process(req.body)

        try {
            const processExists = await prisma.process.findMany({
                where: {
                    roll_material_id: +process.roll_material_id, 
                    type: process.type
                }
            })

            if(processExists.length) {
                res.status(401).send('Este proceso ya no esta disponible')
                return
            }

            if(req.body.sale_id) {
                const saleProductProccess = await prisma.saleProduct.findMany({
                    where: {
                        sale_id: +req.body.sale_id,
                        product_id: +process.product_id
                    }
                })
    
                if(saleProductProccess.length === 0) {
                    res.status(401).send('Esta accion no esta permitida')
                    return
                }
    
                const processExists = saleProductProccess.filter(process => process.status === process.status)
    
                if(processExists.length) {
                    res.status(401).send('Este proceso ya no esta disponible')
                    return
                }
            }

            await prisma.process.create({
                data: {
                    type: process.type, 
                    start_time: process.start_time, 
                    roll_material_id: +process.roll_material_id, 
                    initial_weight: +process.initial_weight, 
                    product_id: +process.product_id
                }
            })

            if(req.body.sale_id) {
                await prisma.saleProduct.update({
                    where: {
                        sale_id_product_id: {
                            sale_id: +req.body.sale_id, 
                            product_id: process.product_id
                        }
                    }, 
                    data: {
                        status: process.type
                    }
                })
            }
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

    static getPrintProcess = async(req: Request, res: Response) => {
        const { date, type } = req.params

        try {
            if(!isValidType(type)) {
                res.status(401).send('El tipo no es el correcto')
                return
            }

            const data = await prisma.process.findMany({
                where: {
                    end_time: {
                        lte: new Date(`${date}-31`), 
                        gte: new Date(`${date}-01`), 
                    }, 
                    type
                }, 
                include: {
                    product: {
                        include: {
                            paper: true
                        }
                    }, 
                    roll_material: true
                }
            })

            if(data.length === 0) {
                res.status(401).send('No hay procesos del tipo que se solicito')
                return
            }

            let newData

            if(type === 'PRINTING') {
                newData = data.map(item => {
                    return {
                        Día: item.end_time, 
                        Product: item.product.name, 
                        Papel: item.product.paper.name, 
                        PesoInicial: item.initial_weight, 
                        PesoFinal: item.final_weight, 
                        Total: item.finished_quantity
                    }
                })
            } else if (type === 'PARAFFIN') {
                newData = data.map(item => {
                    return {
                        Día: item.end_time, 
                        Product: item.product.name, 
                        Papel: item.product.paper.name, 
                        PesoInicial: item.initial_weight, 
                        PesoFinal: item.final_weight, 
                        Total: item.finished_quantity
                    }
                })
            }

            res.json(newData)
        } catch (error) {
            console.log("Hubo un error")
            console.log(error)
        }
    }
}