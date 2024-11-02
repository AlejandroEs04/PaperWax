export type UserType = {
    id?: number 
    fullName?: string
    userName?: string
    password: string 
    role: 'ADMIN' | 'DEVICE' | 'QUALITY' | 'MANAGMENT'
}

export type UserCreate = Pick<UserType, 'userName' | 'password' | 'role'>

class User {
    public id: number 
    public fullName: string
    public userName?: string
    public password: string 
    public role: 'ADMIN' | 'DEVICE' | 'QUALITY' | 'MANAGMENT'

    constructor(item?: Partial<UserType>) {
        this.id = item?.id
        this.fullName = item?.fullName ?? ''
        this.userName = item?.userName ?? ''
        this.password = item?.password
        this.role = item?.role ?? 'DEVICE'
    }
}

export default User