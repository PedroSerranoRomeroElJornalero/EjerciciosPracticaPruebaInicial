import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

type props = {
  route: string;
  fullname: string;
  email: string;
  dateOfHire: string;
  roleDetail: ReactNode;
  picture: string;
  onEdit: () => void;
};

export const TableLaborerDetails = (props: props) => {
  const navigate = useNavigate();
  const { route, fullname, email, dateOfHire, roleDetail, picture, onEdit } = props;

  return (
    <div>
      <div
        className="button"
        onClick={() => {
          navigate(route);
        }}
      >
        Back to all laborers
      </div>
      <div className="laborer">
        <div className="fieldRow">
          <span className="label">Name:</span>
          <span className="value">{fullname}</span>
          <span className="label">Email:</span>
          <span className="value">{email}</span>
          <span className="label">Hire Date:</span>
          <span className="value">{dateOfHire}</span>
          <span className="label">Role:</span>
          <span className="value">{roleDetail}</span>
          <div
            className="button"
            onClick={() => {
              onEdit();
            }}
          >
            Edit
          </div>
        </div>
        <div className="imageWrapper">
          <img src={picture} />
        </div>
      </div>
    </div>
  );
};
