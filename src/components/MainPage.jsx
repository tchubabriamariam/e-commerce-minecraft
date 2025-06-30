import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./NavBar";
import CategoryPage from "./CategoryPage";

function MainPage() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/skins" />} />
        <Route path="/skins" element={<CategoryPage />} />
        <Route path="/zombies" element={<CategoryPage />} />
        <Route path="/animals" element={<CategoryPage />} />
      </Routes>
    </>
  );
}

export default MainPage;
