// Ejercicio 8. Pagina de detalle demasiado acoplada a contexto global
// Objetivo: reducir dependencia del estado global para mejorar enfoque y pruebas.

import { useContext } from "react";
import { AppContext } from "./AppContext";

interface DetailsPageProps {
  employee: {firstName: string, lastName: string, email: string};
  totalEmployees: number;
  theme: string;
  sidebarOpen: boolean;
  onBack: () => void;
}

export function EmployeeDetailView({ employee, totalEmployees, theme, sidebarOpen, onBack }: DetailsPageProps) {

    const fullName = employee.firstName + " " + employee.lastName;

    return (
      <section>
        <button onClick={onBack}>Back</button>
        <h1>{fullName}</h1>
        <p>{employee.email}</p>
        <p>Total employees: {totalEmployees}</p>
        <p>Theme: {theme}</p>
        <p>Sidebar open: {String(sidebarOpen)}</p>
      </section>
    )

}

export function EmployeeDetailPage() {
  const { selectedEmployee, employees, theme, sidebarOpen } = useContext(AppContext);

  if (!selectedEmployee) {
    return <p>No employee selected</p>;
  }

  return (
    <EmployeeDetailView
    employee={selectedEmployee}
    totalEmployees={employees}
    theme={theme}
    sidebarOpen={sidebarOpen}
    onBack={() => window.history.back()}
    />
  );
}
