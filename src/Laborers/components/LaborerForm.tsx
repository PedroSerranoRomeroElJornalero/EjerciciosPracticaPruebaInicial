import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LaborerSchema, LaborerFormData } from "../domain/schemas";
import "@/Laborers/styles/LaborersStyles.scss";
import { ProfileCard } from "@/Laborers/shared/ProfileCard";
import { Button } from "@/shared/components/Button/Button";
import { FormField } from "../shared/FormField";

type Props = {
  laborer: LaborerFormData;
  saving: boolean;
  onSubmit: (data: LaborerFormData) => void;
  onCancel: () => void;
};

export const LaborerForm = ({ laborer, saving, onSubmit, onCancel }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<LaborerFormData>({
    resolver: zodResolver(LaborerSchema),
    defaultValues: laborer,
    mode: "onBlur",
  });

  const watchedLaborer = watch();

  return (
    <div className="detailMobileWrapper">

      <ProfileCard laborer={watchedLaborer} />

      <div className="detailCard modernCard">
        <div className="modernCardHeader">
          <span className="modernCardTitle">Employee information</span>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="modernFields">
            <FormField
              label="First name"
              placeholder="Enter first name"
              registration={register("firstName")}
              error={errors.firstName}
            />

            <FormField
              label="Last name"
              placeholder="Enter last name"
              registration={register("lastName")}
              error={errors.lastName}
            />

            <FormField
              label="Email"
              type="email"
              placeholder="your.email@example.com"
              registration={register("email")}
              error={errors.email}
            />

            <FormField
              label="Hire date"
              type="date"
              registration={register("hireDate")}
              error={errors.hireDate}
            />

            <FormField
              label="Role"
              type="select"
              options={[
                { value: "user", label: "User" },
                { value: "supervisor", label: "Supervisor" },
                { value: "admin", label: "Admin" },
              ]}
              registration={register("role")}
              error={errors.role}
            />

            <FormField
              label="Picture URL"
              placeholder="https://example.com/image.jpg"
              registration={register("picture")}
              error={errors.picture}
            />
          </div>

          <div className="modernFormActions">
            <Button label="Save" color="#1a6b3c" type="submit" disabled={saving} />
            <Button label="Cancel" color="#ccc" onClick={onCancel} />
          </div>
        </form>
      </div>

    </div>
  );
};