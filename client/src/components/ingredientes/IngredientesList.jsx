import {useEffect} from "react";
import { fetchIngredientes } from "../../feactures/ingredientes/ingredientesSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IngredientesForm } from "./IngredienteForm";
import { deleteIngredient } from "../../api/ingrediente";

const IngredientesList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const ingredientes = useSelector((state) => state.ingredientes);
    const ingrediente = ingredientes.result;

    const deleteIngrediente = async (id) => {
        try {
            await deleteIngredient(id);
            dispatch(console.log("succes", "Ingrediente eliminado"))
            dispatch(fetchIngredientes());
        } catch (error) {
            if(error.response.status === 409) dispatch(console.log("error", "Ingrediente en uso"))
            if (error.response.status === 401) dispatch(console.log("error", "No estas autorizado para realizar esta acción"));
            dispatch(fetchIngredientes());
        }
    };

    useEffect(()=>{
        dispatch(fetchIngredientes());
    }, [dispatch]);

    return (
        <div>
            <div>
                <h1>Ingredientes Disponibles</h1>
                <div>
                    <IngredientesForm />
                </div>
                <div>
                    {ingrediente && ingrediente.length > 0 ? (
                        ingrediente.map((ingredient, i) => (
                            <div>
                                <div>
                                    <h1>Nombre: {ingredient.nombre}</h1>
                                    <h2>{ingredient.categoria}</h2>
                                </div>
                                <div>
                                    <button onClick={()=> deleteIngrediente(ingredient.id)}>
                                        Borrar
                                    </button>
                                    <button onClick={()=> navigate(`/edit/ingredientes/${ingredient.id}`)}>
                                        Editar
                                    </button>
                                </div>
                            </div>
                        ))
                    ):(
                       <h1> No hay ingredientes</h1> 
                    )}
                </div>
            </div>
        </div>
    );
};

export default IngredientesList;