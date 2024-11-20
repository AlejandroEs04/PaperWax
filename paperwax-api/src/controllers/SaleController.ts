import { Request, Response } from "express"
import { PrismaClient } from "@prisma/client"
import Sale, { SaleCreate } from "../models/Sale"
import SaleProduct from "../models/SaleProduct"

const prisma = new PrismaClient()

export class SaleController {
    static createSale = async(req: Request, res: Response) => {
        const sale : SaleCreate = new Sale(req.body)

        try {
            const saleSaved = await prisma.sale.create({
                data: {
                    date: new Date(sale.date), 
                    status: sale.status, 
                    customer_id: +sale.customer_id
                }
            })

            const products : SaleProduct[] = req.body.products.map(product => {
                return {
                    product_id: +product.product_id,
                    sale_id: +saleSaved.id, 
                    price: +product.price, 
                    quantity: +product.quantity, 
                    discount: +product.discount
                }
            })

            await prisma.saleProduct.createMany({
                data: products
            })

            res.send('Venta registrada correctamente')
        } catch (error) {
            console.log(error)
            res.status(500).send('Hubo un error registrando el material')
            return
        }
    }

    static getSales = async(req: Request, res: Response) => {
        try {
            const sales = await prisma.sale.findMany({
                include: {
                    products: true, 
                    customer: true
                }
            })

            res.json(sales)
        } catch (error) {
            res.status(500).send('Hubo un error obteniendo las ventas')
            return
        }
    }

    static getSaleProducts = async(req: Request, res: Response) => {
        try {
            const products = await prisma.saleProduct.findMany({
                include: {
                    product: {
                        include: {
                            paper: true,
                            processes: true
                        }, 
                    }, 
                    sale: true
                }
            })

            res.json(products)
        } catch (error) {
            res.status(500).send('Hubo un error obteniendo las ventas')
            return
        }
    } 

    static saleProcess = async(req: Request, res: Response) => {
        try {
            
        } catch (error) {
            
        }
    }
}