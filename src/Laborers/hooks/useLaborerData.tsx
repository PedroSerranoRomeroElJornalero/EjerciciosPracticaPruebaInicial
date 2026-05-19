import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createLaborer,
  editLaborer,
  getLaborers,
} from "../domain/index";
import { Laborer } from "../domain/models";

const LABORERS_KEY = ["laborers"];

export const useLaborers = () => {
  const queryClient = useQueryClient();

  const { 
    data: laborers = [], 
    isLoading,
    error: queryError 
  } = useQuery({
    queryKey: LABORERS_KEY,
    queryFn: getLaborers,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  const invalidate = () => queryClient.invalidateQueries({ queryKey: LABORERS_KEY });

  const create = useMutation({
    mutationFn: (laborer: Laborer) => createLaborer(laborer),
    onSuccess: invalidate,
    onError: (error) => console.error("Error creating laborer:", error),
  });

  const edit = useMutation({
    mutationFn: (laborer: Laborer) => editLaborer(laborer),
    onSuccess: invalidate,
    onError: (error) => console.error("Error editing laborer:", error),
  });

  return {
    laborers,
    isLoading,
    queryError,
    create,
    edit,
  };
};