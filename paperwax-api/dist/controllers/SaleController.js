"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaleController = void 0;
const client_1 = require("@prisma/client");
const Sale_1 = __importDefault(require("../models/Sale"));
const prisma = new client_1.PrismaClient();
class SaleController {
    static createSale = async (req, res) => {
        const sale = new Sale_1.default(req.body);
        try {
            const saleSaved = await prisma.sale.create({
                data: {
                    date: new Date(sale.date),
                    status: sale.status,
                    customer_id: +sale.customer_id
                }
            });
            const products = req.body.products.map(product => {
                return {
                    product_id: +product.product_id,
                    sale_id: +saleSaved.id,
                    price: +product.price,
                    quantity: +product.quantity,
                    discount: +product.discount
                };
            });
            await prisma.saleProduct.createMany({
                data: products
            });
            res.send('Venta registrada correctamente');
        }
        catch (error) {
            console.log(error);
            res.status(500).send('Hubo un error registrando el material');
            return;
        }
    };
    static getSales = async (req, res) => {
        try {
            const sales = await prisma.sale.findMany({
                include: {
                    products: true,
                    customer: true
                }
            });
            res.json(sales);
        }
        catch (error) {
            res.status(500).send('Hubo un error obteniendo las ventas');
            return;
        }
    };
    static getSaleProducts = async (req, res) => {
        try {
            const products = await prisma.saleProduct.findMany({
                include: {
                    product: {
                        include: {
                            paper: true
                        }
                    },
                    sale: true
                }
            });
            res.json(products);
        }
        catch (error) {
            res.status(500).send('Hubo un error obteniendo las ventas');
            return;
        }
    };
    static saleProcess = async (req, res) => {
        try {
        }
        catch (error) {
        }
    };
}
exports.SaleController = SaleController;
//# sourceMappingURL=SaleController.js.map