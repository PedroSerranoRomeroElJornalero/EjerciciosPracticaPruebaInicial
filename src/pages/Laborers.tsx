//   /* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useContext } from "react";
import "../App.scss";
import React from "react";
import TableAllLaborers from "../shared/components/tableAllLaborers";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../Context";

const Laborers = (): React.ReactElement => {
  const laborerData = useContext(DataContext);

  if (!laborerData) {
    throw new Error("Laborers must be used inside DataProvider");
  }

  const { data, fetchData } = laborerData;
  const navigate = useNavigate();

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  return (
    <>
      <TableAllLaborers
        data={data}
        onViewDetails={(id) => navigate(`/laborer-details/${id}`)}
        onEdit={(id) => navigate(`/edit-laborer/${id}`)}
      />
    </>
  );
};

export default Laborers;
