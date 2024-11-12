"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaperController = void 0;
const client_1 = require("@prisma/client");
const Paper_1 = __importDefault(require("../models/Paper"));
const prisma = new client_1.PrismaClient();
class PaperController {
    static createPaper = async (req, res) => {
        const paper = new Paper_1.default(req.body);
        try {
            await prisma.paper.create({
                data: paper
            });
            res.send('Papel registrado con exito');
        }
        catch (error) {
            res.status(500).send('Hubo un error al registrar el papel');
            return;
        }
    };
    static getAllPapers = async (req, res) => {
        try {
            const papers = await prisma.paper.findMany();
            res.json(papers);
        }
        catch (error) {
            res.status(500).send('Hubo un error');
            return;
        }
    };
}
exports.PaperController = PaperController;
//# sourceMappingURL=PaperController.js.map