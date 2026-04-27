import axios from "axios";
import { Laborer } from "./model";


const instance = axios.create({
  baseURL: 'http://localhost:3000/api/',
  timeout: 10000,
});

export async function getLaborers() : Promise<Laborer[]> {
    const {data} = await instance.get<Laborer[]>('laborers');
    return data
}

export async function getSelectedLaborer(selectedLaborer: string) : Promise<Laborer> {
    const {data} = await instance.get<Laborer>(`laborers/${selectedLaborer}`);
    return data;
}

export async function createLaborer (laborer: Laborer) : Promise<Laborer> {
    const {data} = await instance.post<Laborer>('laborers', laborer);
    return data;
}

export async function editLaborer (laborer: Laborer) : Promise<Laborer> {
    const {data} = await instance.put<Laborer>(`laborers/${laborer.id}`, laborer);
    return data;
}