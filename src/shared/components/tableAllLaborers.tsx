import React from "react";
import { Laborer } from "../../models/laborer.model";
import { EmployeeRole, roleTag } from "./roleConfigCustomHook";
import { useNavigate } from "react-router-dom";

type props = {
  data: Laborer[];
  onViewDetails: (id: string) => void;
  onEdit: (id: string) => void;
};

const LaborersBodyTable = React.memo(
  ({
    laborers,
    onViewDetails,
    onEdit,
  }: {
    laborers: Laborer[];
    onViewDetails: (id: string) => void;
    onEdit: (id: string) => void;
  }) => {
    return (
      <tbody>
        {!!laborers.length &&
          laborers.map((laborer: Laborer) => {
            const d = Number(
              new Date().getTime() - new Date(laborer.hireDate).getTime(),
            );
            const date = String(Math.floor(d / 86400000));
            const daysSinceHireDate = date + " days ago";
            const laborerEmail = laborer.email;
            const fullName = laborer.firstName + " " + laborer.lastName;
            const laborerRole = roleTag(laborer.role as EmployeeRole);

            return (
              <tr key={laborer.id}>
                <td
                  onClick={() => {
                    onViewDetails(laborer.id);
                  }}
                >
                  {fullName}
                </td>
                <td>{laborerEmail}</td>
                <td>{daysSinceHireDate}</td>
                <td>{laborerRole}</td>
                <td
                  onClick={() => {
                    onEdit(laborer.id);
                  }}
                  title="Edit"
                >
                  &#9998;
                </td>
              </tr>
            );
          })}
      </tbody>
    );
  },
);

export default function TableAllLaborers({
  data,
  onViewDetails,
  onEdit,
}: props) {
  const navigate = useNavigate();

  return (
    <>
      <div className="headerContainer">
        <h3 className="danger">Click on a laborer name to view details</h3>
        <button className="createLaborer" onClick={() => navigate("/create-laborer")}>
          Create Laborer
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Fullname</th>
            <th>Email</th>
            <th>Days since hired</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <LaborersBodyTable
          laborers={data}
          onViewDetails={onViewDetails}
          onEdit={onEdit}
        />
      </table>
    </>
  );
}
