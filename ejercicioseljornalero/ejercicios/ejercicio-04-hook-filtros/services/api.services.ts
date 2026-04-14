import axios from "axios";
import { Employee } from "../models/Employee.model";

export const getEmployees = async () : Promise<Employee[]> => {
    try {
        const response = await axios.get("/api/employees")
        return response.data
    } catch (error) {
        console.error("Error fetching employees: ", error);
        return [];
    }
}