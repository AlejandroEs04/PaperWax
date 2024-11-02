import { Request, Response } from "express"
import User, { UserCreate } from "../models/User"
import { PrismaClient } from "@prisma/client"
import { checkPassword, hashPassword } from "../utils/auth"
import { generateJWT } from "../utils/jwt"

const prisma = new PrismaClient()

export class AuthController {
    static createAccount = async(req: Request, res: Response) => {
        try {
            const newUser : UserCreate = new User(req.body)
            
            if(newUser.userName.length) {
                const dbUser = await prisma.user.findFirst({ where: { userName: newUser.userName } })
                if(dbUser) {
                    const error = new Error('El nombre de usuario ya esta en uso')
                    res.status(401).json({ error: error.message })
                    return
                }
            }

            newUser.password = await hashPassword(newUser.password)

            await prisma.user.create({ data: newUser })
            res.send('Usuario creado correctamente')
        } catch (error) {
            res.status(500).send('Hubo un error al crear el usuario')
        }
    }

    static login = async(req: Request, res: Response) => {
        try {
            const { id, userName, password } = req.body
            let dbUser

            if(id) {
                dbUser = await prisma.user.findFirst({
                    where: { id }
                })
            } else if(userName) {
                dbUser = await prisma.user.findFirst({
                    where: { userName }
                })
            }

            if(!dbUser) {
                const error = new Error('Usuario no encontrado')
                res.status(401).json({ error: error.message })
                return
            }

            const isPasswordCorrect = await checkPassword(password, dbUser.password)

            if(!isPasswordCorrect) {
                const error = new Error('Password Incorrecto')
                res.status(401).json({ error: error.message })
                return
            }

            const token = generateJWT({ id: dbUser.id })
            res.send(token)
        } catch (error) {
            console.log(error)
            res.status(500).send('Hubo un error')
        }
    }
}

