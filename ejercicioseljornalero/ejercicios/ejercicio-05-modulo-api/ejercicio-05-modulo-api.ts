// Ejercicio 5. Modulo API acoplado y poco reutilizable
// Objetivo: hacerlo consistente, tipado y reutilizable.

import axios from "axios";
import { Employee } from "./model/Employee.model";

const api = axios.create({
  baseURL : "http://localhost:3000/api"
});

export async function getEmployees() : Promise<Employee[]> {
  const response = await api.get<Employee[]>("/employees");
  return response.data;
}

export async function getEmployeeById(id: number) : Promise<Employee>{
  const response = await api.get<Employee>(`/employees/${id}`);
  return response.data;
}

export async function saveEmployee(employee: Omit<Employee, "id">) : Promise<Employee> {
  const response = await api.post<Employee>("/employees", employee);
  return response.data
}
