"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessController = void 0;
const client_1 = require("@prisma/client");
const Process_1 = __importDefault(require("../models/Process"));
const prisma = new client_1.PrismaClient();
const isValidType = (type) => { return type.includes(type); };
class ProcessController {
    static createProcess = async (req, res) => {
        const process = new Process_1.default(req.body);
        try {
            await prisma.process.create({
                data: {
                    type: process.type,
                    start_time: process.start_time,
                    roll_material_id: +process.roll_material_id,
                    initial_weight: +process.initial_weight,
                    product_id: +process.product_id
                }
            });
            res.send('Proceso registrado correctamente');
        }
        catch (error) {
            console.log(error);
            res.status(500).send('Hubo un error registrando el material');
            return;
        }
    };
    static getProcess = async (req, res) => {
        try {
            const processes = await prisma.process.findMany({
                include: {
                    product: true,
                    roll_material: true
                }
            });
            res.json(processes);
        }
        catch (error) {
            res.status(500).send('Hubo un error obteniendo los procesos');
            return;
        }
    };
    static getProcessById = async (req, res) => {
        const { id } = req.params;
        try {
            const process = await prisma.process.findFirst({
                include: {
                    product: true,
                    roll_material: true
                },
                where: {
                    id: +id
                }
            });
            res.json(process);
        }
        catch (error) {
            res.status(500).send('Hubo un error obteniendo los procesos');
            return;
        }
    };
    static finishProcess = async (req, res) => {
        const process = new Process_1.default(req.body);
        const { id } = req.params;
        try {
            const maxIdProduct = await prisma.process.aggregate({
                _max: {
                    finished_product_id: true
                }
            });
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
            });
            res.send('Proceso finalizado correctamente');
        }
        catch (error) {
            res.status(500).send('Hubo un error obteniendo los procesos');
            return;
        }
    };
    static getPrintProcess = async (req, res) => {
        const { date, type } = req.params;
        try {
            if (!isValidType(type)) {
                res.status(401).send('El tipo no es el correcto');
                return;
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
            });
            if (data.length === 0) {
                res.status(401).send('No hay procesos del tipo que se solicito');
                return;
            }
            let newData;
            if (type === 'PRINTING') {
                newData = data.map(item => {
                    return {
                        Día: item.end_time,
                        Product: item.product.name,
                        Papel: item.product.paper.name,
                        PesoInicial: item.initial_weight,
                        PesoFinal: item.final_weight,
                        Total: item.finished_quantity
                    };
                });
            }
            else if (type === 'PARAFFIN') {
                newData = data.map(item => {
                    return {
                        Día: item.end_time,
                        Product: item.product.name,
                        Papel: item.product.paper.name,
                        PesoInicial: item.initial_weight,
                        PesoFinal: item.final_weight,
                        Total: item.finished_quantity
                    };
                });
            }
            res.json(newData);
        }
        catch (error) {
            console.log("Hubo un error");
            console.log(error);
        }
    };
}
exports.ProcessController = ProcessController;
//# sourceMappingURL=ProcessController.js.map