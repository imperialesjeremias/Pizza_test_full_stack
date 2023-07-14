import { Routes, Route } from "react-router-dom";
import Navbar from "./src/components/Navbar";
import Home from "./src/pages/Home";
import { Login } from "./src/pages/Login";
import Pizzas from "./src/pages/Pizzas"
import IngredientesList from "./src/components/ingredientes/IngredientesList";
import { IngredientesForm } from "./src/components/ingredientes/IngredienteForm";
import { PizzasDetail } from "./src/pages/PizzasDetail";
import PizzasForm from "./src/pages/PizzasForm";
import { Register } from "./src/pages/Register";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home/>} />
        <Route path="/" element={<Pizzas/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/ingredientes" element={<IngredientesList />} />
        <Route path="/edit/ingredientes/:id" element={<IngredientesForm/>} />
        <Route path="/pizzas/:id" element={<PizzasDetail/>} />
        {/* <Route path="/pizzas/edit/:id" element={<PizzasForm/>} /> */}
        {/* <Route path="/pizzas/new" element={<PizzasForm/>} /> */}
        <Route path="/register" element={<Register/>} />
        <Route path="/ingredientes/new" element={<IngredientesForm/>} />
      </Routes>
    </>
  );
}

export default App;
