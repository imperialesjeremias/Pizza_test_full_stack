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
            if( error.response && error.response.status === 409) dispatch(console.log("error", "Ingrediente en uso"))
            if (error.response && error.response.status === 401) dispatch(console.log("error", "No estas autorizado para realizar esta acción"));
            dispatch(fetchIngredientes());
        }
    };

    useEffect(()=>{
        dispatch(fetchIngredientes());
    }, [dispatch]);

    return (
        <div className="flex justify-center mt-10">
            <div className="bg-zinc-100 rounded-lg shadow-lg shadow-gray-200 p-8 h-screen w-4/5">
                <h1 className="text-2cl font-bold py-2 mb-2 text-center">Ingredientes Disponibles</h1>
                <div className="">
                    <IngredientesForm />
                </div>
                <div className="flex gap-10 flex-wrap">
                    {ingrediente && ingrediente.length > 0 ? (
                        ingrediente.map((ingredient, i) => (
                            <div key={i} className="px-2">
                                <div className="flex flex-col bg-indigo-100 w-full rounded-lg shadow-lg shadow-gray-400 mt-6 p-4">
                                    <h1 className="py-2 px-2">Nombre:  {ingredient.nombre}</h1>
                                    <h2 className="py-2 px-2">Categoria: {ingredient.categoria}</h2>
                                </div>
                                <div className="flex justify-center">
                                    <button onClick={()=> deleteIngrediente(ingredient.id)} className="mt-2 px-6">
                                        Borrar
                                    </button>
                                    <button onClick={()=> navigate(`/edit/ingredientes/${ingredient.id}`)} className="mt-2 px-6 ">
                                        Editar
                                    </button>
                                </div>
                            </div>
                        ))
                    ):(
                       <h3> No hay ingredientes</h3> 
                    )}
                </div>
            </div>
        </div>
    );
};

export default IngredientesList;