// Ejercicio 1. Componente de tabla demasiado grande
// Objetivo: refactorizar para separar obtencion de datos, renderizado, navegacion y formateo.

import { useEffect, useState } from "react";
import axios from "axios";
import { getEmployee } from "./services/api.services";
import { Employee } from "./models/Employee.model";
import { useNavigate } from "react-router-dom";

export function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getEmployee().then((data) => {
      setEmployees(data)
    });
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Hire date</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee) => (
          <tr key={employee.id}>
            <td onClick={() => navigate("/employee/" + employee.id) }>
              {employee.firstName + " " + employee.lastName}
            </td>
            <td>{employee.email}</td>
            <td>
              <span className={`roleColor.${employee.role.toLowerCase()}`}>
                {employee.role}
              </span>
            </td>
            <td>{employee.hireDate.slice(0, 10)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
