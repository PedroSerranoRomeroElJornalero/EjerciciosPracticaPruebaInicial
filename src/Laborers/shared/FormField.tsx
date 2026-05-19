import { FieldError, UseFormRegisterReturn } from "react-hook-form";

type Props = {
  label: string;
  placeholder?: string;
  type?: "text" | "email" | "date" | "select";
  options?: { value: string; label: string }[];
  registration: UseFormRegisterReturn;
  error?: FieldError;
};

export const FormField = ({
  label,
  placeholder,
  type = "text",
  options,
  registration,
  error,
}: Props) => {
  return (
    <div className="modernFieldGroup">
      <label className="modernFieldLabel">{label}</label>
      
      {type === "select" ? (
        <select
          className={`modernInput ${error ? "error" : ""}`}
          {...registration}
        >
          <option value="">Select {label.toLowerCase()}</option>
          {options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          className={`modernInput ${error ? "error" : ""}`}
          type={type}
          placeholder={placeholder}
          {...registration}
        />
      )}
      
      {error && <span className="fieldError">{error.message}</span>}
    </div>
  );
};
