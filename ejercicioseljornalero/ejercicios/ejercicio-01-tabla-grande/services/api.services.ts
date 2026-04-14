import axios from "axios";
import { Employee } from "../models/Employee.model";

const API_BASE_URL = "http://localhost:3000/api/employees"

export const getEmployee = async (): Promise<Employee[]> => {
    try{
        const response = await axios.get(API_BASE_URL);
        return response.data;
    }catch (error) {
        console.error("Error fetching employees: ", error )
        return [];
    }
}
