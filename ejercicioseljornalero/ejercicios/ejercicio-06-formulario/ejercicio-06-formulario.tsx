// Ejercicio 6. Formulario con estado poco claro
// Objetivo: mejorar tipado, validacion, errores y envio.

import {z} from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import InputForm from "./components/customImput";

const employeeSchema = z.object({
  firstName: z.string().min(1, "El nombre es obligatorio"),
  lastName: z.string().min(1, "El apellido es obligatorio"),
  email: z.string().min(1, "El correo es obligatorio").email("Correo inválido"),
  role: z.string().min(1, "El rol es obligatorio. Selecciona uno"),
})

type FormValue = z.infer<typeof employeeSchema>

const CustomForm = () => {
  const { control, handleSubmit, formState: { errors }} = useForm<FormValue>({
    resolver: zodResolver(employeeSchema)
  })

  const onSubmit: SubmitHandler<FormValue> = (data) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputForm name="firstName" control={control} label="FirstName" type="text" error={errors.firstName} />
      <InputForm name="lastName" control={control} label="LastName" type="text" error={errors.lastName} />
      <InputForm name="email" control={control} label="Email" type="email" error={errors.email} />

    </form>
  );
}
