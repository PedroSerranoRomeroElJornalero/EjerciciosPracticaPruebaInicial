import { useCallback, useState } from "react";
import { getLaborers } from "../domain/index";
import { Laborer } from "../domain/model";

export const useLaborerData = () => {
  const [laborers, setLaborers] = useState<Laborer[]>([]);
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

  return { laborers, loading, getAllLaborers };
};