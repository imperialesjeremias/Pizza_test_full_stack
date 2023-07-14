import { Input } from "@nextui-org/react";
import { Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { updatePizza, getPizza, createPizza } from "../api/pizzas";

const PizzasForm = () => {
    const [pizza, setPizza] = useState({
        nombre: "",
        precio: "",
        estado: "",
    });

    const dispatch = useDispatch();
    const params = useParams();
    const navigate = useNavigate();

    const handleCreatePizza = async (values) => {
        try {
            await createPizza(values);
            // dispatch(console.log("succes", "Pizza creada correctamente"));
            console.log("Pizza creada", values)
            navigate("/");
        } catch (error) {
            if (error.res.status === 401)
            // dispatch(console.log("error", "No estas autorizado para realizar esta acción"));
            console.log(error)
        }
    };

    const handleUpdatePizza = async (id, values) => {
        try {
            await updatePizza(id, values);
            // dispatch(console.log("succes", "Pizza actualizada correctamente"));`
            console.log("Pizza acutalizada", id, values)
            navigate("/");
        } catch (error) {
            if (error.res.status === 401) 
            console.log(error)
            
            // dispatch(console.log("error", "No estas autorizado para realizar esta acción"));
        }
    };

    useEffect(() => {
        const fetchPizza = async () => {
            try {
                const res = await getPizza(params.id);
                console.log(res.data.pizzas);
                setPizza({
                    nombre: res.data.pizzas.nombre,
                    precio: res.data.pizzas.precio,
                    estado: res.data.pizzas.estado,
                });
            } catch (error) {
                console.log(error);
            }
        };
        fetchPizza();
    }, [params.id])

    return (
        <>
            <div>
                <div>
                    <Formik initialValues={pizza} enableReinitialize={true} onSubmit={async (values, action) => {
                        if (params.id) {
                            await handleUpdatePizza(params.id, values);
                        } else {
                            await handleCreatePizza(values);
                        }
                        action.resetForm();
                    }}>
                        {({values,handleChange, handleBlur, handleSubmit, isSubmitting,}) => (
                            <Form onSubmit={handleSubmit}>
                                <div>
                                    <Input type="text" name="nombre" placeholder="Nombre" onChange={handleChange} value={values.nombre}/>
                                    <Input type="text" name="precio" placeholder="Precio" onChange={handleChange} value={values.precio}/>
                                    <select name="estado" onChange={handleChange} value={values.estado}>
                                        <option value="" disabled> Seleccione el estado</option>
                                        <option value="Activo">Activo</option>
                                        <option value="Inactivo">Inactivo</option>
                                    </select>
                                </div>
                                <button type="submit"
                                disabled={isSubmitting}>
                                    {isSubmitting ? "Creando..." : "Crear"}
                                </button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </>
    );
};

export default PizzasForm;