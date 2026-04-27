import { useNavigate, useParams } from "react-router-dom";

import { LaborerDetails } from "../components/LaborerDetails";
import { EmployeeRole, Laborer } from "../domain/model";
import { useEffect, useState } from "react";
import { getSelectedLaborer } from "../domain/index";
import { RoleTag } from "../components/RoleTag";

type customLaborer = Laborer | null;

const formatDate = (date: string) => 
  new Date(date).toLocaleDateString("es-ES");

export const LaborerDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [laborer, setLaborer] = useState<customLaborer>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;

    const loadLaborer = async () => {
      getSelectedLaborer(id)
        .then((response) => setLaborer(response))
        .catch((error) =>
          console.error("Error fetching laborer details:", error),
        );
    };
    loadLaborer();
  }, [id]);

  if (!laborer) return <div>Loading...</div>;

  return (
    <LaborerDetails
      route="/laborers"
      laborer={laborer}
      roleDetail={RoleTag(laborer.role as EmployeeRole) ?? "Unknown"}
      roleClass={`role-${laborer.role}`}
      dateOfHire={formatDate(laborer.hireDate)}
      onEdit={() => navigate(`/edit-laborer/${id}`)}
    />
  );
};