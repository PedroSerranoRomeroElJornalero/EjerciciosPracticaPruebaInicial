// Ejercicio 7. Duplicacion de UI para badges de rol
// Objetivo: evitar duplicacion con una solucion reutilizable y consistente.

export function EmployeeRow({ role }: { role: string }) {
  return (
    <span className={`pill ${role}`}>
      {role}
    </span>
  );
}

export function EmployeeHeader({ role }: { role: string }) {
  return <EmployeeRow role={role} />;
}
