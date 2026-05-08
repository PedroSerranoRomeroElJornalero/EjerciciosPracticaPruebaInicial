import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LaborerSchema, LaborerFormData } from "../domain/laborerSchema";
import "../../Laborers/styles/LaborersStyles.scss";
import { ProfileCard } from "../shared/ProfileCard";
import { Button } from "../../shared/components/Button/Button";

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
            <div className="modernFieldGroup">
              <label className="modernFieldLabel">First name</label>
              <input 
                className={`modernInput ${errors.firstName ? 'error' : ''}`}
                placeholder="Enter first name"
                {...register("firstName")}
              />
              {errors.firstName && (
                <span className="fieldError">{errors.firstName.message}</span>
              )}
            </div>

            <div className="modernFieldGroup">
              <label className="modernFieldLabel">Last name</label>
              <input 
                className={`modernInput ${errors.lastName ? 'error' : ''}`}
                placeholder="Enter last name"
                {...register("lastName")}
              />
              {errors.lastName && (
                <span className="fieldError">{errors.lastName.message}</span>
              )}
            </div>

            <div className="modernFieldGroup">
              <label className="modernFieldLabel">Email</label>
              <input 
                className={`modernInput ${errors.email ? 'error' : ''}`}
                type="email" 
                placeholder="your.email@example.com"
                {...register("email")}
              />
              {errors.email && (
                <span className="fieldError">{errors.email.message}</span>
              )}
            </div>

            <div className="modernFieldGroup">
              <label className="modernFieldLabel">Hire date</label>
              <input 
                className={`modernInput ${errors.hireDate ? 'error' : ''}`}
                type="date"
                {...register("hireDate")}
              />
              {errors.hireDate && (
                <span className="fieldError">{errors.hireDate.message}</span>
              )}
            </div>

            <div className="modernFieldGroup">
              <label className="modernFieldLabel">Role</label>
              <select className={`modernInput ${errors.role ? 'error' : ''}`} {...register("role")}>
                <option value="user">User</option>
                <option value="supervisor">Supervisor</option>
                <option value="admin">Admin</option>
              </select>
              {errors.role && (
                <span className="fieldError">{errors.role.message}</span>
              )}
            </div>

            <div className="modernFieldGroup">
              <label className="modernFieldLabel">Picture URL</label>
              <input 
                className={`modernInput ${errors.picture ? 'error' : ''}`}
                placeholder="https://example.com/image.jpg"
                {...register("picture")}
              />
              {errors.picture && (
                <span className="fieldError">{errors.picture.message}</span>
              )}
            </div>
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