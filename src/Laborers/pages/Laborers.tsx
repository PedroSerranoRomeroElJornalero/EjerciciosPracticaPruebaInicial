//   /* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactElement, useContext, useEffect } from "react";
import TableAllLaborers from "../components/AllLaborers/TableAllLaborers";
import { DataContext } from "../../Context";
import "../../App.scss";

export default function Laborers(): ReactElement {
  const laborerData = useContext(DataContext);

  if (!laborerData) {
    throw new Error("Laborers must be used inside DataProvider");
  }

  const { laborers, getAllLaborers } = laborerData;

  useEffect(() => {
    getAllLaborers();
  }, [getAllLaborers]);

  return (
    <>
      <TableAllLaborers
        laborers={laborers}
      />
    </>
  );
}