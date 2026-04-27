import { useCallback, useState } from "react";
import { editLaborer, getLaborers, getSelectedLaborer } from "../domain/index";
import { Laborer } from "../domain/model";

export const useLaborerData = () => {
  const [laborers, setLaborers] = useState<Laborer[]>([]);
  const [laborer, setLaborer] = useState<Laborer>();
  const [loading, setLoading] = useState(false);

  const getAllLaborers = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getLaborers();
      setLaborers(response);
    } catch (error) {
      console.error("Error fetching laborers:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const getLaborerById = useCallback(async (id: string) => {
    try {
      setLoading(true);
      const response = await getSelectedLaborer(id);
      setLaborer(response);
    } catch (error) {
      console.error("Error fetching selected laborer:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const saveEditedLaborer = useCallback(async (updatedLaborer: Laborer) => {
    try {
      setLoading(true);
      const response = await editLaborer(updatedLaborer);
      setLaborer(response);
    } catch (error) {
      console.error("Error editing laborer:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    laborers,
    laborer,
    setLaborer,
    loading,
    getAllLaborers,
    getLaborerById,
    saveEditedLaborer,
  };
};