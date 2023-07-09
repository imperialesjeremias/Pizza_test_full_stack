import { Routes, Route } from "react-router-dom";
import Navbar from "./src/components/Navbar";
import Home from "./src/pages/Home";
import { Login } from "./src/pages/Login";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={Home} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
