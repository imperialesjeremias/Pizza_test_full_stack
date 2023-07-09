import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchIngredientes} from "../../feactures/ingredientes/ingredientesSlice";
import { useParams } from "react-router-dom";
import axios from "axios";
import {fetchPizzaDetalle} from "../../feactures/pizzas/pizzasSlice";
import { verify } from "../../checkType/verify";

export const ingredientesAdd = () => {
    const dispatch = useDispatch();
    const {id} = useParams();
    const ingrediente = useSelector((state) => state.ingredientes);
    const [selectedIngrediente, setSelectedIngrediente] = useState("");
    const isAuth = localStorage.getItem("isAuth");

    const handleIngredienteChange = (e) => {
        setSelectedIngrediente(e.target.value);
    };
    const handleAgregarClick = async () => {
        try {
            await axios.post(`http://localhost:3000/api/pizzas/${id}/igredientes/${selectedIngrediente}`);
            dispatch(fetchPizzaDetalle(id));
        } catch (error) {
            dispatch(console.log("error", "Internal Server Error"));
        }
    };

    useEffect(() => {
        dispatch(fetchIngredientes());
    }, [dispatch]);

    return (
        <div>
            <div>
                <h1>Ingrediente</h1>
                <form>
                    <select value={selectedIngrediente} onChange={handleIngredienteChange}>
                        <option value="">Seleccionar Ingrediente</option>
                        {ingrediente &&
                        ingrediente.result &&
                        ingrediente.result.length > 0 ? (
                            ingrediente.result.map((ingre, i) => (
                                <option key={i} value={ingre.id}>{ingre.nombre}</option>
                            ))
                        ): (
                            <option disabled> No hay ingredientes disponibles</option>
                        )}
                    </select>
                </form>
                <button onClick={handleAgregarClick} disabled={!selectedIngrediente || isAuth === "false"}>
                    Agregar
                </button>
            </div>
        </div>
    )
    
}