import { Employee } from "../models/Employee.model";

export const filtrarEmpleados = (
    employees : Employee[],
    role : string,
    search : string
) => {
    return employees
    .filter((employee) => {
      if (role === "all") return true;
      return employee.role === role;
    })
    .filter((employee) => {
      const fullName = employee.firstName + " " + employee.lastName;
      return (
        fullName.toLowerCase().includes(search.toLowerCase()) ||
        employee.email.toLowerCase().includes(search.toLowerCase())
      );
    })
    .sort((a, b) => a.firstName.localeCompare(b.firstName));
}