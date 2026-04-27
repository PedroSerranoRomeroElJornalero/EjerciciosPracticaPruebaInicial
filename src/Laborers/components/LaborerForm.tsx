import { ChangeEvent, FormEvent } from "react";
import backgroundImg from "../../../backend/src/assets/WhiteWallpaper.jpg";
import { EmployeeRole, Laborer } from "../domain/model";
import { RoleTag } from "./RoleTag";
import "../../Laborers/styles/LaborersStyles.scss";

type Props = {
  laborer: Laborer;
  saving: boolean;
  route?: string;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onChange: (field: keyof Laborer) => (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onCancel: () => void;
};

export const LaborerForm = ({ laborer, saving, onSubmit, onChange, onCancel }: Props) => {

  return (
    <div className="laborersPage" style={{ "--bg-image": `url(${backgroundImg})` } as React.CSSProperties}>
      <div className="laborersOverlay" />
      <div className="laborersContent detailPage">
        <button className="backBtn" onClick={onCancel}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back
        </button>

        <div className="editLayout">
          <form className="formCard" onSubmit={onSubmit}>
            <p className="sectionTitle">Employee information</p>
            <div className="fieldGrid">
              <div className="field">
                <label htmlFor="firstName">First name</label>
                <input id="firstName" value={laborer.firstName} onChange={onChange("firstName")} />
              </div>
              <div className="field">
                <label htmlFor="lastName">Last name</label>
                <input id="lastName" value={laborer.lastName} onChange={onChange("lastName")} />
              </div>
              <div className="field fieldFull">
                <label htmlFor="email">Email</label>
                <input id="email" type="email" value={laborer.email} onChange={onChange("email")} />
              </div>
              <div className="field">
                <label htmlFor="hireDate">Hire date</label>
                <input id="hireDate" type="date" value={laborer.hireDate} onChange={onChange("hireDate")} />
              </div>
              <div className="field">
                <label htmlFor="role">Role</label>
                <select id="role" value={laborer.role} onChange={onChange("role")}>
                  <option value="user">User</option>
                  <option value="supervisor">Supervisor</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="field fieldFull">
                <label htmlFor="picture">Picture URL</label>
                <input id="picture" value={laborer.picture} onChange={onChange("picture")} />
              </div>
            </div>
            <div className="formActions">
              <button className="btn" type="button" onClick={onCancel}>Cancel</button>
              <button className="btn btnPrimary" type="submit" disabled={saving}>
                {saving ? "Saving..." : "Save"}
              </button>
            </div>
          </form>

          <div className="profileCard">
            <div className="profileBanner" />
            <div className="profileBody">
              <img className="profileAvatar" src={laborer.picture} alt={laborer.firstName} />
              <p className="profileName">{laborer.firstName} {laborer.lastName}</p>
              <p className="profileEmail">{laborer.email}</p>
              <span className={`roleBadge role-${laborer.role}`}>
                {RoleTag(laborer.role as EmployeeRole)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};