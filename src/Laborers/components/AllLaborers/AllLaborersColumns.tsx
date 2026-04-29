import { EmployeeRole, Laborer } from "../../domain/model";
import { RoleTag } from "../RoleTag";
import { Column } from "../../../shared/table/Table";
import { EyeIcon } from "../../../shared/icons/EyeIcon";
import { PencilIcon } from "../../../shared/icons/PencilIcon";
import { TrashIcon } from "../../../shared/icons/TrashIcon";

type Props = {
  onView: (laborer: Laborer) => void;
  onEdit: (laborer: Laborer) => void;
  onDelete: (laborer: Laborer) => void;
};

export const useLaborerColumns = ({ onView, onEdit, onDelete }: Props): Column<Laborer>[] => {
  return [
    {
      header: "Fullname",
      accessor: (laborer) => `${laborer.firstName} ${laborer.lastName}`,
      clickeable: true,
      onCellClick: (laborer) => onView(laborer),
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
        <div style={{ display: "flex", gap: "12px" }}>
          <EyeIcon onClick={() => onView(laborer)} />
          <PencilIcon onClick={() => onEdit(laborer)} />
          <TrashIcon onClick={() => onDelete(laborer)} />
        </div>
      ),
    },
  ];
};