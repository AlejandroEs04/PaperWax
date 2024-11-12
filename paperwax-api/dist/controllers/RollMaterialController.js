"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RollMaterialController = void 0;
const client_1 = require("@prisma/client");
const RollMaterial_1 = __importDefault(require("../models/RollMaterial"));
const prisma = new client_1.PrismaClient();
class RollMaterialController {
    static createRollMaterial = async (req, res) => {
        const rollMaterial = new RollMaterial_1.default(req.body);
        try {
            await prisma.rollMaterial.create({
                data: rollMaterial
            });
            res.send('Rollo registrado correctamente');
        }
        catch (error) {
            console.log(error);
            res.status(500).send('Hubo un error registrando el rollo');
        }
    };
    static getAllRollMaterial = async (req, res) => {
        try {
            const rolls = await prisma.rollMaterial.findMany({
                include: {
                    material: {
                        select: {
                            name: true
                        }
                    },
                    paper: {
                        select: {
                            name: true
                        }
                    }
                }
            });
            res.json(rolls);
        }
        catch (error) {
            console.log(error);
            res.status(500).send('Hubo un error obteniendo los rollos');
        }
    };
}
exports.RollMaterialController = RollMaterialController;
//# sourceMappingURL=RollMaterialController.js.map