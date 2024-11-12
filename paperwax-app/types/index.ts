export type Paper = {
    id: number 
    name: string
}

export type User = {
    id?: number | string 
    userName?: string 
    password: string
}

export type UserLogin = Pick<User, 'id' | 'userName' | 'password'>