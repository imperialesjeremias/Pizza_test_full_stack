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
      <div>
        <div>
          <div>
            <p>Pizzas</p>
            <div>
              <button
                onClick={() => navigate("pizzas/new")}
                disabled={isAuth === "false"}
              >
                Add Pizza
              </button>
              <button
                onClick={() => navigate("/ingredientes")}
                disabled={isAuth === "false"}
              >
                Lista de Ingredientes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        {pizzas && pizzas.length > 0 ? (
            pizzas.map((pizza, i) => (
                <div key={i}>
                    <div>
                        <div onClick={() => navigate(`pizzas/${pizza.id}`)}>
                            <h1>Nombre: {pizza.nombre}</h1>
                            <h2>Precio: {pizza.precio} $</h2>
                            <h3>Estado: {pizza.estado}</h3>
                        </div>
                    </div>
                </div>
            ))
        ) : (
            <p>No hay pizzas disponibles</p>
        )}
      </div>
    </>
  );
}

export default Pizzas;