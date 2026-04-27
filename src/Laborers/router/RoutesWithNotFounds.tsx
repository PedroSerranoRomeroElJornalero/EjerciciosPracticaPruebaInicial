import { ReactNode } from "react"
import { Navigate, Route, Routes } from "react-router-dom"

type props = {
    children: ReactNode
}

export const RoutesWithNotFounds = ({ children }: props) => {
    return (
        <Routes>
            {children}
            <Route path="*" element={<Navigate to="/404" />} />
            <Route path="/404" element={<h1>Página no encontrada</h1>} />
        </Routes>
    )
}