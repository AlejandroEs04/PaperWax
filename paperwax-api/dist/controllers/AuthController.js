"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const User_1 = __importDefault(require("../models/User"));
const client_1 = require("@prisma/client");
const auth_1 = require("../utils/auth");
const jwt_1 = require("../utils/jwt");
const prisma = new client_1.PrismaClient();
class AuthController {
    static createAccount = async (req, res) => {
        try {
            const newUser = new User_1.default(req.body);
            if (newUser.userName.length) {
                const dbUser = await prisma.user.findFirst({ where: { userName: newUser.userName } });
                if (dbUser) {
                    const error = new Error('El nombre de usuario ya esta en uso');
                    res.status(401).json({ error: error.message });
                    return;
                }
            }
            newUser.password = await (0, auth_1.hashPassword)(newUser.password);
            await prisma.user.create({ data: newUser });
            res.send('Usuario creado correctamente');
        }
        catch (error) {
            res.status(500).send('Hubo un error al crear el usuario');
        }
    };
    static login = async (req, res) => {
        try {
            const { id, userName, password } = req.body;
            let dbUser;
            if (id) {
                dbUser = await prisma.user.findFirst({
                    where: { id: +id }
                });
            }
            else if (userName) {
                dbUser = await prisma.user.findFirst({
                    where: { userName }
                });
            }
            if (!dbUser) {
                const error = new Error('Usuario no encontrado');
                res.status(401).json({ error: error.message });
                return;
            }
            const isPasswordCorrect = await (0, auth_1.checkPassword)(password, dbUser.password);
            if (!isPasswordCorrect) {
                const error = new Error('Password Incorrecto');
                res.status(401).json({ error: error.message });
                return;
            }
            const token = (0, jwt_1.generateJWT)({ id: dbUser.id });
            res.send(token);
        }
        catch (error) {
            console.log(error);
            res.status(500).send('Hubo un error');
        }
    };
}
exports.AuthController = AuthController;
//# sourceMappingURL=AuthController.js.map