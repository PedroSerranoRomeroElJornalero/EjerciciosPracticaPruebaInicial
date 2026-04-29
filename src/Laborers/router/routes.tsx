import { BrowserRouter, Navigate, Route } from "react-router-dom";
import { RoutesWithNotFounds } from "./RoutesWithNotFounds";
import AppLayout from "../../shared/AppLayout";
import Laborers from "../pages/Laborers";


export const AppRouter = () => {
  return (
    <BrowserRouter>
      <RoutesWithNotFounds>
        <Route element={<AppLayout/>}>
          <Route path="/" element={<Navigate to={"/laborers"} />} />
          <Route path="/laborers" element={<Laborers/>} />
        </Route>
      </RoutesWithNotFounds>
    </BrowserRouter>
  );
};
