import { TrashIcon } from "../../shared/icons/TrashIcon";
import "../styles/LaborersStyles.scss";

type Props = {
  laborerName: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export const DeleteLaborer = ({ laborerName, onConfirm, onCancel }: Props) => {
  return (
    <div className="deleteCard modernCard">
      <div className="deleteIcon">
        <TrashIcon />
      </div>
      <p className="deleteTitle">Delete laborer</p>
      <p className="deleteSubtitle">
        Are you sure you want to delete <strong>{laborerName}</strong>? This action cannot be undone.
      </p>
      <div className="modernFormActions">
        <button className="modernCancelBtn" onClick={onCancel}>Cancel</button>
        <button className="deleteConfirmBtn" onClick={onConfirm}>Delete</button>
      </div>
    </div>
  );
};