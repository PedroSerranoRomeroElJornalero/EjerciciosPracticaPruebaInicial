# Ejercicios de práctica frontend

## Ejercicio 1. Componente de tabla demasiado grande

**Enunciado:** Analiza el siguiente componente y refactorízalo para separar mejor sus responsabilidades. La solución debería dejar más clara la obtención de datos, el renderizado, la navegación y el formateo de la información.

```tsx
import { useEffect, useState } from "react";
import axios from "axios";

type Employee = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  hireDate: string;
};

export function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/employees").then((response) => {
      setEmployees(response.data);
    });
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Hire date</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee) => (
          <tr key={employee.id}>
            <td
              onClick={() => {
                window.location.href = "/employees/" + employee.id;
              }}
            >
              {employee.firstName + " " + employee.lastName}
            </td>
            <td>{employee.email}</td>
            <td>
              <span
                style={{
                  color:
                    employee.role === "admin"
                      ? "red"
                      : employee.role === "manager"
                      ? "blue"
                      : "black",
                }}
              >
                {employee.role}
              </span>
            </td>
            <td>{employee.hireDate.slice(0, 10)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
```

## Ejercicio 2. Tipado débil en un componente de detalle

**Enunciado:** Revisa este componente de detalle y refactorízalo para que el tipado sea más claro y seguro. El componente debería expresar mejor qué datos necesita realmente.

```tsx
type Props = {
  employee: any;
};

export function EmployeeDetailCard({ employee }: Props) {
  return (
    <section>
      <h2>{employee.firstName + " " + employee.lastName}</h2>
      <p>{employee.email}</p>
      <p>{employee.phone}</p>
      <p>{employee.address.city}</p>
      <p>{employee.hireDate.substring(0, 10)}</p>
    </section>
  );
}
```

## Ejercicio 3. Hook de carga con estados incompletos

**Enunciado:** Analiza este hook y mejóralo para gestionar correctamente los distintos estados de una carga remota. La solución debería contemplar al menos carga, éxito, error y posibilidad de recarga manual.

```ts
import { useEffect, useState } from "react";
import axios from "axios";

export function useEmployees() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    axios.get("/api/employees").then((response) => {
      setData(response.data);
      setLoading(false);
    });
  }, []);

  return {
    data,
    loading,
  };
}
```

## Ejercicio 4. Hook con lógica derivada y filtros mal ubicados

**Enunciado:** Refactoriza este hook para separar mejor la obtención de datos, el estado de filtros y la lógica derivada del listado.

```ts
import { useEffect, useState } from "react";
import axios from "axios";

export function useEmployeeList() {
  const [employees, setEmployees] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("all");

  useEffect(() => {
    axios.get("/api/employees").then((response) => {
      setEmployees(response.data);
    });
  }, []);

  const filtered = employees
    .filter((employee) => {
      if (role === "all") return true;
      return employee.role === role;
    })
    .filter((employee) => {
      const fullName = employee.firstName + " " + employee.lastName;
      return (
        fullName.toLowerCase().includes(search.toLowerCase()) ||
        employee.email.toLowerCase().includes(search.toLowerCase())
      );
    })
    .sort((a, b) => a.firstName.localeCompare(b.firstName));

  return {
    employees: filtered,
    search,
    setSearch,
    role,
    setRole,
  };
}
```

## Ejercicio 5. Módulo API acoplado y poco reutilizable

**Enunciado:** Revisa este módulo y refactorízalo para que sea más consistente, más tipado y más fácil de reutilizar desde distintos componentes o hooks.

```ts
import axios from "axios";

export async function getEmployees() {
  const response = await axios.get("http://localhost:3000/api/employees");
  return response;
}

export async function getEmployeeById(id: number) {
  const response = await axios.get(
    "http://localhost:3000/api/employees/" + id
  );
  return response.data;
}

export async function saveEmployee(employee: any) {
  return axios.post("http://localhost:3000/api/employees", employee);
}
```

## Ejercicio 6. Formulario con estado poco claro

**Enunciado:** Analiza este formulario y propón una versión más clara, más tipada y más fácil de extender. Ten en cuenta la validación, el manejo de errores y el envío del formulario.

```tsx
import { useState } from "react";

export function EmployeeForm() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
  });

  const [error, setError] = useState("");

  function handleChange(event: any) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  function handleSubmit(event: any) {
    event.preventDefault();

    if (!form.firstName || !form.email) {
      setError("Missing fields");
      return;
    }

    console.log("saving", form);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="firstName" value={form.firstName} onChange={handleChange} />
      <input name="lastName" value={form.lastName} onChange={handleChange} />
      <input name="email" value={form.email} onChange={handleChange} />
      <select name="role" value={form.role} onChange={handleChange}>
        <option value="">Select role</option>
        <option value="admin">Admin</option>
        <option value="user">User</option>
      </select>

      {error && <p>{error}</p>}

      <button type="submit">Save</button>
    </form>
  );
}
```

## Ejercicio 7. Duplicación de UI para badges de rol

**Enunciado:** Refactoriza estos componentes para evitar duplicación y conseguir una solución reutilizable y consistente en toda la aplicación.

```tsx
export function EmployeeRow({ role }: { role: string }) {
  return (
    <span className={role === "admin" ? "red" : role === "manager" ? "blue" : "gray"}>
      {role === "admin" ? "Admin" : role === "manager" ? "Manager" : "User"}
    </span>
  );
}

export function EmployeeHeader({ role }: { role: string }) {
  if (role === "admin") {
    return <div className="pill red">Admin</div>;
  }

  if (role === "manager") {
    return <div className="pill blue">Manager</div>;
  }

  return <div className="pill gray">User</div>;
}
```

## Ejercicio 8. Página de detalle demasiado acoplada a contexto global

**Enunciado:** Analiza esta página de detalle y refactorízala para reducir su dependencia del estado global. La solución debería dejar el componente más enfocado y más fácil de reutilizar o probar.

```tsx
import { useContext } from "react";
import { AppContext } from "./AppContext";

export function EmployeeDetailPage() {
  const { selectedEmployee, employees, theme, sidebarOpen } = useContext(AppContext);

  if (!selectedEmployee) {
    return <p>No employee selected</p>;
  }

  return (
    <section>
      <button onClick={() => window.history.back()}>Back</button>
      <h1>
        {selectedEmployee.firstName} {selectedEmployee.lastName}
      </h1>
      <p>{selectedEmployee.email}</p>
      <p>Total employees: {employees.length}</p>
      <p>Theme: {theme}</p>
      <p>Sidebar open: {String(sidebarOpen)}</p>
    </section>
  );
}
```

## Ejercicio 9. Lógica de página mezclada con transformaciones

**Enunciado:** Refactoriza esta página para extraer la lógica derivada a funciones o módulos con nombres claros, de forma que el JSX quede más limpio y expresivo.

```tsx
type Props = {
  employees: Array<{
    id: number;
    role: string;
    hireDate: string;
  }>;
};

export function DashboardPage({ employees }: Props) {
  return (
    <section>
      <h2>Total employees: {employees.length}</h2>
      <h3>
        Admins:
        {employees.filter((employee) => employee.role === "admin").length}
      </h3>
      <h3>
        Recent hires:
        {
          employees.filter((employee) => {
            const today = new Date().getTime();
            const hireDate = new Date(employee.hireDate).getTime();
            const diff = today - hireDate;
            return diff < 1000 * 60 * 60 * 24 * 30;
          }).length
        }
      </h3>
    </section>
  );
}
```

## Ejercicio 10. Componente add/edit con demasiado branching

**Enunciado:** Revisa este componente y replantea su diseño para compartir la parte común sin mezclar demasiado los comportamientos de crear y editar.

```tsx
type Props = {
  mode: "create" | "edit";
  employee?: {
    firstName: string;
    lastName: string;
    email: string;
  };
};

export function EmployeeEditor({ mode, employee }: Props) {
  return (
    <div>
      <h1>{mode === "create" ? "Create employee" : "Edit employee"}</h1>

      <input defaultValue={mode === "edit" ? employee?.firstName : ""} />
      <input defaultValue={mode === "edit" ? employee?.lastName : ""} />
      <input defaultValue={mode === "edit" ? employee?.email : ""} />

      <button>{mode === "create" ? "Create" : "Update"}</button>

      {mode === "edit" ? (
        <button style={{ background: "red", color: "white" }}>Delete</button>
      ) : null}
    </div>
  );
}
```
