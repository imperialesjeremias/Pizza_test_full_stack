import { useNavigate, useParams } from "react-router-dom";
import {
  fetchPizzaDetalle,
  selectPizzaDetalle,
} from "../feactures/pizzas/pizzasSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { IngredientesAdd } from "../components/ingredientes/ingredientesAdd";
import axios from "axios";
import "../../index.css";

export const PizzasDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = localStorage.getItem("isAuth");
  const pizzaDetalle = useSelector(selectPizzaDetalle);

  useEffect(() => {
    dispatch(fetchPizzaDetalle(id));
  }, [dispatch, id]);

  if (!pizzaDetalle) {
    return <p>Cargando...</p>;
  }

  const handleDeleteIngre = async (pizzaId, ingredienteId) => {
    try {
      const res = await axios.post(
        `http://localhost:3000/api/pizzas/${pizzaId}/remove-ingrediente/${ingredienteId}`
      );
      console.log("response", res);
      dispatch(fetchPizzaDetalle(pizzaId));
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <>
      <div>
        <div className="bg-zinc-200 rounded-lg shadow-lg shadow-gray-400 p-8 h-4/6 w-1/4 m-auto py-10 px-10 mt-24">
          <h1 className="text-xl font-bold text-center mb-2">{pizzaDetalle.nombre}</h1>
          <p className="text-center">Precio: {pizzaDetalle.precio}</p>
          <p className="text-center">Estado: {pizzaDetalle.estado}</p>
          <div className="flex justify-center pr-4">
            <button
              onClick={() => navigate(`/pizzas/edit/${pizzaDetalle.id}`)}
              disabled={isAuth === "false"}
              className="text-lg rounded-lg mt-3 p-1 rounded bg-indigo-700 text-white hover:bg-indigo-600"
            >
              Editar
            </button>
          </div>
          {pizzaDetalle.ingredientes.length > 0 ? (
            <div className="mb-10">
              <h2 className="text-indigo-700 my-2 font-bold">Ingredientes:</h2>
              <ul>
                {pizzaDetalle.ingredientes.map((ingrediente) => (
                  <li key={ingrediente.id}>
                    {ingrediente.nombre}
                    <button
                      onClick={() => handleDeleteIngre(id, ingrediente.id)}
                      className="mx-6 bg-red-700 p-1 rounded text-white hover:bg-red-600"
                    >
                      Borrar
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="py-4">No hay ingredientes disponibles</p>
          )}
          <h3 className="pb-2 text-indigo-700 font-bold ">Agregar Ingrediente:</h3>
          <IngredientesAdd />
        </div>
      </div>
    </>
  );
};
