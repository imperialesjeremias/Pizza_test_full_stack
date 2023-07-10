import { useNavigate, useParams } from "react-router-dom";
import { fetchPizzaDetalle, selectPizzaDetalle } from "../feactures/pizzas/pizzasSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { IngredientesAdd } from "../components/ingredientes/ingredientesAdd";
import axios from "axios";

export const PizzasDetail = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAuth = localStorage.getItem("isAuth");
    const pizzaDetalle = useSelector(selectPizzaDetalle);

    useEffect(()=>{
        dispatch(fetchPizzaDetalle(id));
    },[dispatch,id]);

    if (!pizzaDetalle) {
        return <p>Cargando...</p>;
    }

    const handleDeleteIngre = async (pizzaId, ingredienteId) => {
        try {
            const res = await axios.post(`http://localhost:3000/api/pizzas/${pizzaId}/remove-ingrediente/${ingredienteId}`);
            console.log("response", res);
            dispatch(fetchPizzaDetalle(pizzaId));
        } catch (error) {
            console.log("error", error);
        };
    }
    return (
        <>
          <div>
            <div>
                <h1>{pizzaDetalle.nombre}</h1>
                <p>Precio: {pizzaDetalle.precio}</p>
                <p>Estado: {pizzaDetalle.estado}</p>
                <div>
                    <button onClick={()=> navigate(`/pizzas/edit/${pizzaDetalle.id}`)} disabled={isAuth === "false"}>
                        Editar
                    </button>
                </div>
                {pizzaDetalle.ingredientes.length > 0 ? (
                    <div>
                        <h2>Ingredientes</h2>
                        <ul>
                            {
                                pizzaDetalle.ingredientes.map((ingrediente) => (
                                    <li key={ingrediente.id}>
                                        {ingrediente.nombre}
                                        <button onClick={() => handleDeleteIngre(id, ingrediente.id)}>
                                            Borrar
                                        </button>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                ) : (
                    <p>No hay ingredientes disponibles</p>
                )}
            </div>
            <IngredientesAdd/>
          </div>
        </>
    )
}