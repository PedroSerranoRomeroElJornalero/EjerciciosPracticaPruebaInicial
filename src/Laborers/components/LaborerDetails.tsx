import { Laborer } from "../domain/model";
import "../../Laborers/styles/LaborersStyles.scss";
import { ProfileCard } from "../shared/ProfileCard";
import { Button } from "../../shared/Button/Button";

type Props = {
  laborer: Laborer;
  dateOfHire: string;
  onEdit: () => void;
};

export const LaborerDetails = ({ laborer, dateOfHire, onEdit }: Props) => {

  return (
    <div className="detailMobileWrapper">

      <ProfileCard laborer={laborer} />

      <div className="detailCard modernCard">
        <div className="modernCardHeader">
          <span className="modernCardTitle">Details</span>
          <Button label="Edit" color="#abc5cf" onClick={onEdit} />
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
  );
};