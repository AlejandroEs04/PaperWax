import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"
import Product, { ProductCreate } from "../models/Product"

const prisma = new PrismaClient()

export class ProductController {
    static createProduct = async(req: Request, res: Response) => {
        const product : ProductCreate = new Product(req.body)

        try {
            await prisma.product.create({
                data: product
            })

            res.send('Producto dado de alta correctamente')
        } catch (error) {
            res.status(500).send('Hubo un error al crear el producto')
            return
        }
    }

    static getAllProducts = async(req: Request, res: Response) => {
        try {
            const products = await prisma.product.findMany()
            res.json(products)
        } catch (error) {
            res.status(500).send('Hubo un error')
            return
        }
    }
}