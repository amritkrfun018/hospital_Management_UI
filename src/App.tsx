import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import DoctorInfoDisplay from "./DoctorInfoDisplay";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/hospital_Management_UI" element={<DoctorInfoDisplay/>} />
      </Routes>
    </BrowserRouter>
  );
}
