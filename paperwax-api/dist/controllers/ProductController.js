"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const client_1 = require("@prisma/client");
const Product_1 = __importDefault(require("../models/Product"));
const prisma = new client_1.PrismaClient();
class ProductController {
    static createProduct = async (req, res) => {
        const product = new Product_1.default(req.body);
        try {
            await prisma.product.create({
                data: {
                    name: product.name,
                    description: product.description,
                    paper_id: +product.paper_id,
                    quantity: +product.quantity
                }
            });
            res.send('Producto dado de alta correctamente');
        }
        catch (error) {
            console.log(error);
            res.status(500).send('Hubo un error al crear el producto');
            return;
        }
    };
    static getAllProducts = async (req, res) => {
        try {
            const products = await prisma.product.findMany();
            res.json(products);
        }
        catch (error) {
            console.log(error);
            res.status(500).send('Hubo un error');
            return;
        }
    };
}
exports.ProductController = ProductController;
//# sourceMappingURL=ProductController.js.map