export type UserType = {
    id?: number;
    fullName?: string;
    userName?: string;
    password: string;
    role: 'ADMIN' | 'DEVICE' | 'QUALITY' | 'MANAGMENT';
};
export type UserCreate = Pick<UserType, 'userName' | 'password' | 'role'>;
declare class User {
    id: number;
    fullName: string;
    userName?: string;
    password: string;
    role: 'ADMIN' | 'DEVICE' | 'QUALITY' | 'MANAGMENT';
    constructor(item?: Partial<UserType>);
}
export default User;
