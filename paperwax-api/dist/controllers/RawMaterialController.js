"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RawMaterialController = void 0;
const client_1 = require("@prisma/client");
const RawMaterial_1 = __importDefault(require("../models/RawMaterial"));
const prisma = new client_1.PrismaClient();
class RawMaterialController {
    static createRawMaterial = async (req, res) => {
        const rawMateria = new RawMaterial_1.default(req.body);
        try {
            await prisma.rawMaterial.create({
                data: rawMateria
            });
            res.send('Material registrado correctamente');
        }
        catch (error) {
            res.status(500).send('Hubo un error registrando el material');
            return;
        }
    };
    static getAllRawMaterial = async (req, res) => {
        try {
            const rawMaterials = await prisma.rawMaterial.findMany();
            res.json(rawMaterials);
        }
        catch (error) {
            res.status(500).send('Hubo un error obteniendo los materiales');
            return;
        }
    };
}
exports.RawMaterialController = RawMaterialController;
//# sourceMappingURL=RawMaterialController.js.map