import { useNavigate } from "react-router-dom";
import backgroundImg from "../../../backend/src/assets/WhiteWallpaper.jpg";
import { Laborer } from "../domain/model";
import "../../Laborers/styles/LaborersStyles.scss";
import { ProfileCard } from "../shared/ProfileCard";

type Props = {
  laborer: Laborer;
  route: string;
  dateOfHire: string;
  onEdit: () => void;
};

export const LaborerDetails = ({ laborer, dateOfHire, route, onEdit }: Props) => {
  const navigate = useNavigate();

  return (
    <div className="laborersPage" style={{ "--bg-image": `url(${backgroundImg})` } as React.CSSProperties}>
      <div className="laborersOverlay" />

      <div className="laborersContent detailPage">
        <button className="backBtn" onClick={() => navigate(route)}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back
        </button>

        <div className="detailMobileWrapper">

          <ProfileCard laborer={laborer} />

          <div className="detailCard modernCard">
            <div className="modernCardHeader">
              <span className="modernCardTitle">Details</span>
              <button className="btn modernEditBtn" onClick={onEdit}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
                Edit
              </button>
            </div>

            <div className="modernFields">
              <div className="modernField">
                <span className="modernFieldLabel">Email</span>
                <span className="modernFieldValue">{laborer.email}</span>
              </div>
              <div className="modernDivider" />
              <div className="modernField">
                <span className="modernFieldLabel">Hire date</span>
                <span className="modernFieldValue">{dateOfHire}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};