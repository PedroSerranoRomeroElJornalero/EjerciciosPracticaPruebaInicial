import { useEffect, useState } from "react";
import { getEmployees } from "../services/api.services";
import { Employee } from "../models/Employee.model";

export function useEmployees() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  
  useEffect(() => {
    getEmployees().then(setEmployees);
  }, []);

  return employees; 
}