import { ReactElement } from "react";
import TableAllLaborers from "../components/AllLaborers/TableAllLaborers";
import backgroundImg from "../../../backend/src/assets/WhiteWallpaper.jpg";
import "../styles/LaborersStyles.scss";
import { useLaborers } from "../hooks/useLaborerData";
import { Skeleton } from "@/shared/components/Ui/Skeleton";

export default function Laborers(): ReactElement {
  const { isLoading } = useLaborers();

  if (isLoading) {
    return (
      <div className="laborersPage" style={{ "--bg-image": `url(${backgroundImg})` } as React.CSSProperties}>
        <div className="laborersContent">
          <Skeleton />
        </div>
      </div>
    );
  }

  return <TableAllLaborers />;
}