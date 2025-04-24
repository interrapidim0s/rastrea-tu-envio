import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SearchForm } from "./components/SearchForm";
import { TrackingResult } from "./components/TrackingResult";
import { Admin } from "./components/Admin";

export default function App() {
  return (
    <BrowserRouter basename={"/rastrea-tu-envio/"}>
      <Routes>
        <Route path="/" element={<SearchForm />} />
        <Route path="/resultado/:guia" element={<TrackingResult />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}
