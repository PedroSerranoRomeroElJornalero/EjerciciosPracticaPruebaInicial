import { EmployeeRole } from "../domain/model";
import "../../Laborers/styles/LaborersStyles.scss";

const roleConfig: Record<EmployeeRole, { label: string; className: string }> = {
  admin:      { label: "Admin",      className: "role-admin" },
  supervisor: { label: "Supervisor", className: "role-supervisor" },
  user:       { label: "User",       className: "role-user" },
};

export const RoleTag = (role: EmployeeRole) => {
  const config = roleConfig[role];
  return <span className={`roleTag ${config.className}`}>{config.label}</span>;
};