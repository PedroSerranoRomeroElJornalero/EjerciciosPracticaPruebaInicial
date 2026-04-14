// Ejercicio 2. Tipado debil en un componente de detalle
// Objetivo: aclarar y asegurar los tipos de datos requeridos por el componente.

import { Employee } from "./models/Employee.model";

type Props = {
  employee: Employee;
};

export function EmployeeDetailCard({ employee }: Props) {
  
  const fullName = employee.firstName + " " + employee.lastName;
  
  return (
    <section>
      <h2>{fullName}</h2>
      <p>{employee.email}</p>
      <p>{employee.phone}</p>
      <p>{employee.address.city}</p>
      <p>{employee.hireDate.substring(0, 10)}</p>
    </section>
  );
}
