// Ejercicio 4. Hook con logica derivada y filtros mal ubicados
// Objetivo: separar obtencion de datos, estado de filtros y logica derivada.

import { useState } from "react";
import { filtrarEmpleados } from "./filters/filters";
import { useEmployees } from "./customHooks/useEmployees";

export function useEmployeeList() {
  const employees = useEmployees()
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("all");
  const empleadosFiltrados = filtrarEmpleados(employees, role, search)
  

  return {
    employees: empleadosFiltrados,
    search,
    setSearch,
    role,
    setRole,
  };
}

// EN ESTE ME HE AYUDADO BASTANTE DE LA IA