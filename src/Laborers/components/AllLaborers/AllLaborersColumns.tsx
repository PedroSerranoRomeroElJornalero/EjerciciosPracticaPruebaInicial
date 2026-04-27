import { useNavigate } from "react-router-dom";
import { EmployeeRole, Laborer } from "../../domain/model";
import { RoleTag } from "../RoleTag";
import { Column } from "../../../shared/table/Table";
import { EyeIcon } from "../../../shared/icons/EyeIcon";
import { PencilIcon } from "../../../shared/icons/PencilIcon";

export const useLaborerColumns = (): Column<Laborer>[] => {
  const navigate = useNavigate();

  return [
    {
      header: "Fullname",
      accessor: (laborer) => `${laborer.firstName} ${laborer.lastName}`,
      clickeable: true,
      onCellClick: (laborer) => navigate(`/laborer-details/${laborer.id}`),
    },
    {
      header: "Email",
      accessor: (laborer) => laborer.email,
    },
    {
      header: "Days since hired",
      accessor: (laborer) => {
        const ms = new Date().getTime() - new Date(laborer.hireDate).getTime();
        return `${Math.floor(ms / 86400000)} days ago`;
      },
    },
    {
      header: "Role",
      accessor: (laborer) => RoleTag(laborer.role as EmployeeRole),
    },
    {
      header: "Actions",
      accessor: (laborer) => (
        <div style={{ display: "flex", gap: "12px", justifyContent: "left" }}>
          <EyeIcon onClick={() => navigate(`/laborer-details/${laborer.id}`)} />
          <PencilIcon onClick={() => navigate(`/edit-laborer/${laborer.id}`)} />
        </div>
      ),
    },
  ];
};