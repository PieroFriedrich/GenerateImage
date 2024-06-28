import React, { useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import NoteEdit from "./pages/NoteEdit";
import Navbar from "./components/NavBar";

const App = () => {
  useEffect(() => {
    const rootElement = document.getElementById("root");
    if (rootElement) {
      rootElement.style.marginLeft = "auto";
      rootElement.style.marginRight = "auto";
    }
  }, []);
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/note/:id" element={<NoteEdit />} />
      </Routes>
    </div>
  );
};

export default App;
