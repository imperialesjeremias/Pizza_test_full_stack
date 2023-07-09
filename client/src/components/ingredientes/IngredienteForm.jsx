import {Input} from "@nextui-org/react";
import { Formik, Form } from "formik";
import { fetchIngredientes } from "../../feactures/ingredientes/ingredientesSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import {useParamas, useNavigate, useLocation} from "react-router-dom";
import { useEffect, useState } from "react";
import { getIgrediente, updatedIngrediente } from "../../api/ingrediente";
import { verify } from "../../checkType/verify";

export const IngredientesForm = () => {
    const [ing, setIng] = useState({
        nombre: "",
        categoria: "",
    });

    const dispatch = useDispatch();
    const params = useParamas();
    const location = useLocation();
    const navigate = useNavigate();

    const isEditPage = location.pathname.icludes("/edit");

    const handleCreate = async (values) => {
        const token = localStorage.getItem("token");
        const basicToken = localStorage.getItem("basicToken");
        const headers = {
            Accept: "application/json",
            Authorization: verify(basicToken, token)
        }
        try {
            await axios.post(`http://localhost:3000/api/ingredientes`, values, {headers});
            dispatch(fetchIngredientes());
        } catch (error) {
            dispatch(console.log("error", "internal server error"));
        }
    };

    const handleUpdate = async (id, values) => {
        try {
            await updatedIngrediente(id, value);
            dispatch(console.log("success", "Ingrediente actualizado"))
            navigate("/ingredientes");
        } catch (error) {
            if (error.response.status === 401)
            dispatch(console.log("error", "No estas autorizado para realizar esta acción"));
        }
    };

    useEffect(() => {
        const loadIng = async () => {
            if (isEditPage) {
                const res = await getIgrediente(params.id);
                setIng({
                    nombre: res.data.result.nombre,
                    categoria: res.data.result.categoria,
                });
            }
        };
        loadIng();
    }, [params.id]);

    return (
        
    )
}