import { useNavigate } from "react-router-dom";
import backgroundImg from "../../../../backend/src/assets/WhiteWallpaper.jpg";
import "../../styles/LaborersStyles.scss"
import { useLaborerColumns } from "./AllLaborersColumns";
import { Table } from "../../../shared/table/Table";
import { Laborer } from "../../domain/model";

export default function TableAllLaborers({ laborers }: { laborers: Laborer[] }) {
  const navigate = useNavigate();
  const columns = useLaborerColumns();

  return (
    <div className="laborersPage" style={{ "--bg-image": `url(${backgroundImg})` } as React.CSSProperties}>
      <div className="laborersContent">
        <div className="headerContainer">
          <button className="createLaborer" onClick={() => navigate("/create-laborer")}>
            + Create laborer
          </button>
        </div>
        <Table
          data={laborers}
          columns={columns}
          keyExtractor={(laborer) => laborer.id}
        />
      </div>
    </div>
  );
}