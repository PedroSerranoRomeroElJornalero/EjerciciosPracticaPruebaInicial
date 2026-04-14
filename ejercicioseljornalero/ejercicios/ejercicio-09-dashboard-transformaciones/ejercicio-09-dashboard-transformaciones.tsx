// Ejercicio 9. Logica de pagina mezclada con transformaciones
// Objetivo: extraer logica derivada a funciones o modulos con nombres claros.

interface Employee {
  id: number;
  role: string;
  hireDate: string;
}

interface Props {
  employees: Array<Employee>;
};

export function countAdmins (employees: Array<Employee>) {
  return employees.filter(employee => employee.role === "admin").length;
}

export function countRecentHires (employees: Array<Employee>) {

  const MILISEGUNDOS30DIAS = 1000 * 60 * 60 * 24 * 30;

  return employees.filter((employee) => {
            const today = new Date().getTime();
            const hireDate = new Date(employee.hireDate).getTime();
            const diff = today - hireDate;
            return diff < MILISEGUNDOS30DIAS;
          }).length
}


export function DashboardPage({ employees }: Props) {
  return (
    <section>
      <h2>Total employees: {employees.length}</h2>
      <h3>
        Admins:
        {countAdmins(employees)}
      </h3>
      <h3>
        Recent hires:
        {countRecentHires(employees)}
      </h3>
    </section>
  );
}
