import { ChangeEvent, FormEvent } from "react";
import { Laborer } from "../../models/laborer.model";

type props = {
    laborer: Laborer;
    saving: boolean;
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
    onChange: (field: keyof Laborer) => (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    onCancel: () => void
}

export const TableLaborerEditAndAdd = ({ laborer, saving, onSubmit, onChange, onCancel }: props) => {
  return (
    <div className="laborer">
      <form className="fieldRow" onSubmit={onSubmit}>
        <label className="label" htmlFor="firstName">
          First Name
        </label>
        <input
          id="firstName"
          className="value"
          value={laborer.firstName}
          onChange={onChange("firstName")}
        />

        <label className="label" htmlFor="lastName">
          Last Name
        </label>
        <input
          id="lastName"
          className="value"
          value={laborer.lastName}
          onChange={onChange("lastName")}
        />

        <label className="label" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          className="value"
          value={laborer.email}
          onChange={onChange("email")}
        />

        <label className="label" htmlFor="hireDate">
          Hire Date
        </label>
        <input
          type="date"
          id="hireDate"
          className="value"
          value={laborer.hireDate}
          onChange={onChange("hireDate")}
        />

        <label className="label" htmlFor="picture">
          Url Picture
        </label>
        <input
          id="picture"
          className="value"
          value={laborer.picture}
          onChange={onChange("picture")}
        />

        <label className="label" htmlFor="role">
          Role
        </label>
        <select
          id="role"
          className="value"
          value={laborer.role}
          onChange={onChange("role")}
        >
          <option value="user">User</option>
          <option value="supervisor">Supervisor</option>
          <option value="admin">Admin</option>
        </select>

        <div>
          <button className="button" type="submit" disabled={saving}>
            {saving ? "Saving..." : "Save"}
          </button>
          <button
            className="button"
            type="button"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </form>

      <div className="imageWrapper">
        <img src={laborer.picture} alt="Laborer" />
      </div>
    </div>
  );
};
