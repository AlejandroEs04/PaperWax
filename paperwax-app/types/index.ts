export type Paper = {
    id: number 
    name: string
}

export type User = {
    id?: number 
    userName?: string 
    password: string
}

export type UserLogin = Pick<User, 'id' | 'userName' | 'password'>