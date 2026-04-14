import { useCallback, useEffect, useState } from "react";
import { editLaborer, getLaborers, getSelectedLaborer } from "./api.services";
import { Laborer } from "../models/laborer.model";

const useLaborerData = () => {

  const initialLaborer: Laborer = {id: "1",
    picture: "../../backend/src/assets/laborer2.jpg",
    firstName: "Pedro",
    lastName: "Serrano",
    hireDate: "16/03/2026",
    email: "pedroserrano@eljornalero.es",
    role: "user"
  }

  const [data, setData] = useState<Laborer[]>([])
  const [laborer, setLaborer] = useState<Laborer>(initialLaborer)
  const [view, setView] = useState({ page: 'laborers', selectedLaborer: "-1" })
  const [loading, setLoading] = useState(false)
  
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getLaborers();
      setData(response);
      setLoading(false);
    }catch (error) {
      console.error('Error fetching laborers:', error);
    }finally {
      setLoading(false);
    }
  }, []);

  const laborerfetchData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getSelectedLaborer(view.selectedLaborer);
      setLaborer(response);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching selected laborer:', error);
    } finally {
      setLoading(false);
    }
  }, [view.selectedLaborer]);

  const saveEditedLaborer = useCallback(async (updatedLaborer: Laborer) => {
    try{
      setLoading(true);
      const response = await editLaborer(updatedLaborer);
      setLaborer(response);
      setLoading(false);
    }catch (error) {
      console.error('Error editing laborer:', error);
    }finally{
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    if (view.page === 'laborers') fetchData();
    if (view.page === 'laborer-detail' && view.selectedLaborer !== "-1") laborerfetchData();
  }, [view.page, view.selectedLaborer, fetchData, laborerfetchData])  
    
  return {
    data,
    laborer,
    setLaborer,
    view,
    setView,
    loading,
    fetchData,
    saveEditedLaborer
  }
}

export default useLaborerData;