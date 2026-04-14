export type EmployeeRole = "admin" | "supervisor" | "user";

const roleConfing : Record<EmployeeRole, {label: string, className: string}> = {
 admin: { label: 'Admin', className: 'admin' },
 supervisor: { label: 'Supervisor', className: 'supervisor' },
 user: { label: 'User', className: 'user' },
}

const roleTag = (role: EmployeeRole) => {
 const config = roleConfing[role];
 return <span className={`tag ${config.className}`}>{config.label}</span>
}

export { roleTag };