//   /* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import { Laborer } from "../models/laborer.model";
import {
  EmployeeRole,
  roleTag,
} from "../shared/components/roleConfigCustomHook";
import { useNavigate, useParams } from "react-router-dom";
import { getSelectedLaborer } from "../services/api.services";
import { TableLaborerDetails } from "../shared/components/tableLaborerDetails";


type customLaborer = Laborer | null;

const LaborerDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [laborer, setLaborer] = useState<customLaborer>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadLaborer = async () => {
      if (!id) return;

      try {
        const response = await getSelectedLaborer(id);
        setLaborer(response);
      } catch (error) {
        console.error("Error fetching laborer details:", error);
      }
    };
    
    loadLaborer();
  }, [id]);

  function formatDate(date: string) {
    return new Date(date).toLocaleDateString("es-ES");
  }

  if (!laborer) {
    return <div>Loading...</div>;
  }

  const { picture, firstName, lastName, email, role, hireDate } = laborer;
  const dateOfHire = hireDate ? formatDate(hireDate) : "Unknown";
  const roleDetail = roleTag(role as EmployeeRole) ?? "Unknown";
  const fullName = `${firstName} ${lastName}`;

  return (
    <TableLaborerDetails
      route="/laborers"
      fullname={fullName}
      email={email}
      dateOfHire={dateOfHire}
      roleDetail={roleDetail}
      picture={picture}
      onEdit={() => navigate(`/edit-laborer/${id}`)}
    />
  );
};

export default LaborerDetail;
