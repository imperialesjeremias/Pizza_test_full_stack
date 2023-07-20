import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchPizzas } from "../feactures/pizzas/pizzasSlice";
import { fetchIngredientes } from "../feactures/ingredientes/ingredientesSlice";

function Pizzas() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = localStorage.getItem("isAuth");

  const pizzas = useSelector((state) => state.pizzas);

  useEffect(() => {
    dispatch(fetchPizzas());
    dispatch(fetchIngredientes());
  }, [dispatch]);

  return (
    <>
      <div className="w-full sm:px-6">
        <div className="px-4 md:px-10 py-4 my-4 md:py-7 bg-gray-100 rounded-tl-lg rounded-tr-lg">
          <div className="sm: flex items-center justify-between">
            <p className="text-base sm:text-lg md:text-cl lg:text-2xl font-bold leading-normal text-gray-800">Pizzas</p>
            <div>
              <button
                onClick={() => navigate("pizzas/new")}
                disabled={isAuth === "false"}
                className="inline-flex sm:ml-3 mt-4 sm:mt-0 items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded text-white"
              >
                Add Pizza
              </button>
              <button onClick={() => navigate("/ingredientes/new")}
              className=" inline-flex sm:ml-3 mt-4 sm:mt-0 items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded text-white">
                Agregar Ingrediente
              </button>
              <button
                onClick={() => navigate("/ingredientes")}
                disabled={isAuth === "false"} 
                className="inline-flex sm:ml-3 mt-4 sm:mt-0 items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded text-white"
              >
                Lista de Ingredientes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {pizzas && pizzas.length > 0 ? (
            pizzas.map((pizza, i) => (
                <div key={i} className="px-2">
                    <div className="flex bg-indigo-100 w-full rounded-lg shadow-lg shadow-gray-400 mx-3 mb-2 px-4 py-10 gap-x-2 my-2 overflow-auto cursor-pointer">
                        <div onClick={() => navigate(`pizzas/${pizza.id}`)}>
                            <h1 className="py-2">Nombre: {pizza.nombre}</h1>
                            <h2>Precio: {pizza.precio} $</h2>
                            <h3 className="py-2">Estado: {pizza.estado}</h3>
                        </div>
                    </div>
                </div>
            ))
        ) : (
            <p className="text-indigo-300 m-auto mt-20 text-lg">No hay pizzas disponibles</p>
        )}
      </div>
    </>
  );
}

export default Pizzas;