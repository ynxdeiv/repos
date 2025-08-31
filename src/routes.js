import React from "react";
import Main from "./pages/main";
import Repo from "./pages/repo";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function PageRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/repo/:repo" element={<Repo />} />
      </Routes>
    </BrowserRouter>
  );
}
