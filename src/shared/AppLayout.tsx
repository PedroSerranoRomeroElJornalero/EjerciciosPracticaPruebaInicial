import { Outlet } from "react-router-dom";
import { DataProvider } from "../Context";

const AppLayout = () => {
    return (
    <>
      <DataProvider>
        <h1 className="laborerCMSDetail">Laborer CMS</h1>
        <Outlet/>
      </DataProvider>
    </>
  );
}

export default AppLayout;