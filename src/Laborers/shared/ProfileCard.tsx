import { EmployeeRole, Laborer } from "../domain/model";
import "../../Laborers/styles/LaborersStyles.scss";
import { RoleTag } from "../components/RoleTag";

type Props = {
  laborer: Laborer;
};

export const ProfileCard = ({ laborer }: Props) => {
  const initials = `${laborer.firstName?.[0] ?? ""}${laborer.lastName?.[0] ?? ""}`.toUpperCase();

  return (
    <div className="profileCard modernCard">
      <div className="modernAvatarWrap">
        {laborer.picture ? (
          <img className="modernAvatar" src={laborer.picture} alt={laborer.firstName} />
        ) : (
          <div className="modernAvatarInitials">{initials}</div>
        )}
      </div>
      <p className="modernName">{laborer.firstName} {laborer.lastName}</p>
      <p className="modernEmail">{laborer.email}</p>
      <span className={`modernBadge role-${laborer.role}`}>
        {RoleTag(laborer.role as EmployeeRole)}
      </span>
    </div>
  );
};