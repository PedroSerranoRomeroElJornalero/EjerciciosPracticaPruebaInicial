// Ejercicio 3. Hook de carga con estados incompletos
// Objetivo: contemplar estados de carga, exito, error y recarga manual.

import { useEffect, useState } from "react";
import { getEmployees } from "./services/api.services";
import { Employee } from "./models/Employee.models";

type CustomError = string | null;

export function useEmployees() {
  const [data, setData] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<CustomError>(null);

  const fetchDatos = async () => {
    setLoading(true);
    setError(null)

    try {
      const empleados = await getEmployees();
      setData(empleados);      
    } catch (error) {
      setError("Hubo un error inesperado: ")
    }finally{
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDatos();
  }, [])

  return {
    data,
    loading,
    error,
    reload: fetchDatos
  };
}
