import { ChangeEvent, FormEvent } from "react";
import backgroundImg from "../../../backend/src/assets/WhiteWallpaper.jpg";
import { Laborer } from "../domain/model";
import "../../Laborers/styles/LaborersStyles.scss";
import { ProfileCard } from "../shared/ProfileCard";

type Props = {
  laborer: Laborer;
  saving: boolean;
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

        <div className="detailMobileWrapper">

          <ProfileCard laborer={laborer} />

          <div className="detailCard modernCard">
            <div className="modernCardHeader">
              <span className="modernCardTitle">Employee information</span>
            </div>

            <form onSubmit={onSubmit}>
              <div className="modernFields">

                <div className="modernField">
                  <span className="modernFieldLabel">First name</span>
                  <input
                    className="modernInput"
                    id="firstName"
                    value={laborer.firstName}
                    onChange={onChange("firstName")}
                    placeholder="First name"
                  />
                </div>
                <div className="modernDivider" />

                <div className="modernField">
                  <span className="modernFieldLabel">Last name</span>
                  <input
                    className="modernInput"
                    id="lastName"
                    value={laborer.lastName}
                    onChange={onChange("lastName")}
                    placeholder="Last name"
                  />
                </div>
                <div className="modernDivider" />

                <div className="modernField">
                  <span className="modernFieldLabel">Email</span>
                  <input
                    className="modernInput"
                    id="email"
                    type="email"
                    value={laborer.email}
                    onChange={onChange("email")}
                    placeholder="email@example.com"
                  />
                </div>
                <div className="modernDivider" />

                <div className="modernField">
                  <span className="modernFieldLabel">Hire date</span>
                  <input
                    className="modernInput"
                    id="hireDate"
                    type="date"
                    value={laborer.hireDate}
                    onChange={onChange("hireDate")}
                  />
                </div>
                <div className="modernDivider" />

                <div className="modernField">
                  <span className="modernFieldLabel">Role</span>
                  <select
                    className="modernInput"
                    id="role"
                    value={laborer.role}
                    onChange={onChange("role")}
                  >
                    <option value="user">User</option>
                    <option value="supervisor">Supervisor</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div className="modernDivider" />

                <div className="modernField">
                  <span className="modernFieldLabel">Picture URL</span>
                  <input
                    className="modernInput"
                    id="picture"
                    value={laborer.picture}
                    onChange={onChange("picture")}
                    placeholder="https://..."
                  />
                </div>

              </div>

              <div className="modernFormActions">
                <button className="modernCancelBtn" type="button" onClick={onCancel}>
                  Cancel
                </button>
                <button className="modernSaveBtn" type="submit" disabled={saving}>
                  {saving ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};