// Ejercicio 10. Componente add/edit con demasiado branching
// Objetivo: compartir parte comun sin mezclar comportamientos de crear y editar.

interface Employee {
  firstName: string;
  lastName: string;
  email: string;
}

interface Props {
  title: string;
  buttonText: string;
  employee?: Employee;
};

export function EmployeeFormBase ({ title, buttonText, employee }: Props) {
  return (
  <div>
    <h1>{title}</h1>

    <input type="text" defaultValue={employee?.firstName}/>
    <input type="text" defaultValue={employee?.lastName}/>
    <input type="text" defaultValue={employee?.email}/>

    <button>{buttonText}</button>
  </div>
);
}

export function CreateEmployeeForm () {
  return (
    <EmployeeFormBase 
      title = "Create Employee"
      buttonText="Create"
     />
  );
}

export function EditEmployeeForm ({ employee } : Props) {
  return (
    <div>
      <EmployeeFormBase
      title="Edit Employee"
      employee={employee}
      buttonText="Update"
      />
      <button className="deleteButton">Delete</button>
    </div>
  )
}