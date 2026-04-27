import { EmployeeRole } from "../domain/model";
import "../../Laborers/styles/LaborersStyles.scss";

const roleConfing : Record<EmployeeRole, {label: string, className: string}> = {
 admin: { label: 'Admin', className: 'admin' },
 supervisor: { label: 'Supervisor', className: 'supervisor' },
 user: { label: 'User', className: 'user' },
}

export const RoleTag = (role: EmployeeRole) => {
 const config = roleConfing[role];
 return <span className={`tag ${config.className}`}>{config.label}</span>
}
