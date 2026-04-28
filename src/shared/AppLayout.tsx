import { Outlet } from "react-router-dom";
import { DataProvider } from "../Context";

const AppLayout = () => {
    return (
    <>
      <DataProvider>
        <Outlet/>
      </DataProvider>
    </>
  );
}

export default AppLayout;