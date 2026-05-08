import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createLaborer,
  editLaborer,
  getLaborers,
} from "../domain/index";
import { Laborer } from "../domain/model";

const LABORERS_KEY = ["laborers"];

export const useLaborers = () => {
  const queryClient = useQueryClient();

  const { data: laborers = [], isLoading } = useQuery({
    queryKey: LABORERS_KEY,
    queryFn: getLaborers,
  });

  const invalidate = () => queryClient.invalidateQueries({ queryKey: LABORERS_KEY });

  const create = useMutation({
    mutationFn: (laborer: Laborer) => createLaborer(laborer),
    onSuccess: invalidate,
  });

  const edit = useMutation({
    mutationFn: (laborer: Laborer) => editLaborer(laborer),
    onSuccess: invalidate,
  });

  return {
    laborers,
    isLoading,
    create,
    edit,
  };
};