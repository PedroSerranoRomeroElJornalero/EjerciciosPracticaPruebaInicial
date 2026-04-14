import { BrowserRouter, Navigate, Route } from "react-router-dom";
import LaborerDetail from "../pages/LaborerDetail";
import LaborerEdit from "../pages/LaborerEdit";
import Laborers from "../pages/Laborers";
import { RoutesWithNotFounds } from "./RoutesWithNotFounds";
import AppLayout from "./AppLayout";
import { LaborerCreate } from "../pages/LaborerCreate";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <RoutesWithNotFounds>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Navigate to={"/laborers"} />} />
          <Route path="/laborers" element={<Laborers />} />
          <Route path="/laborer-details/:id" element={<LaborerDetail />} />
          <Route path="/edit-laborer/:id" element={<LaborerEdit />} />
          <Route path="/create-laborer" element={<LaborerCreate />} />
        </Route>
      </RoutesWithNotFounds>
    </BrowserRouter>
  );
};
