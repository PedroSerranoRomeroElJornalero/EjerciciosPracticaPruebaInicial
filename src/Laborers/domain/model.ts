export type Laborer = {
    id:string,
    picture:string,
    firstName:string,
    lastName:string,
    email:string,
    role:string,
    hireDate:string,
}

export type EmployeeRole = "admin" | "supervisor" | "user";