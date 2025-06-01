export enum IRole{
    MANAGE_CONTENT = "MANAGE_CONTENT",
    MANAGE_COURSES = "MANAGE_COURSES",
    SUPER_ADMIN = "SUPER_ADMIN"
}

export interface IAdmin {
    id: string;
    email: string;
    role: string;
    client: string;
}