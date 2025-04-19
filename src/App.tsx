import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SearchForm } from "./components/SearchForm";
import { TrackingResult } from "./components/TrackingResult";
import { Admin } from "./pages/Admin";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SearchForm />} />
        <Route path="/resultado/:guia" element={<TrackingResult />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}
