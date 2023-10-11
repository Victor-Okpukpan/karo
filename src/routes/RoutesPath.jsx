import { Route, Routes } from "react-router-dom"
import AuthenticationPage from "../pages/authentication"
import ExpenseTrackerPage from "../pages/expense-tracker"
export default function RoutesPath() {
  return (
    <Routes>
      <Route path="/" exact element={<AuthenticationPage />} />
      <Route path="/expense-tracker" element={<ExpenseTrackerPage />} />
    </Routes>
  )
}
