import "./Button.scss";

type Props = {
  label: string;
  color: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

export const Button = ({ label, color, onClick, type = "button", disabled }: Props) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    style={{ backgroundColor: color }}
    className="sharedBtn"
  >
    {label}
  </button>
);