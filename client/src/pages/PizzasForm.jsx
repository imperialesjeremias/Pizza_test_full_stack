import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { updatePizza, getPizza, createPizza } from "../api/pizzas";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import "../../index.css";

const PizzasForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(
      Yup.object().shape({
        nombre: Yup.string().required("El nombre es obligatorio"),
        precio: Yup.string().required("El precio es obligatorio"),
        estado: Yup.string().required("El estado es obligatorio"),
      })
    ),
  });

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
      console.log("Pizza creada", values);
      navigate("/");
    } catch (error) {
      if (error.res && error.res.status === 401) console.log(error);
    }
  };

  const handleUpdatePizza = async (id, values) => {
    try {
      await updatePizza(id, values);
      console.log("Pizza acutalizada", id, values);
      navigate("/");
    } catch (error) {
      if (error.res && error.res.status === 401) console.log(error);
    }
  };

  useEffect(() => {
    const fetchPizza = async () => {
      try {
        if (params.id) {
          const res = await getPizza(params.id);
          setPizza({
            nombre: res.data.pizzas.nombre,
            precio: res.data.pizzas.precio,
            estado: res.data.pizzas.estado,
          });
          setValue("nombre", res.data.pizzas.nombre);
          setValue("precio", res.data.pizzas.precio);
          setValue("estado", res.data.pizzas.estado);
          navigate("/")
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchPizza();
  }, [params.id, setValue]);

  const onSubmit = (data) => {
    if (params.id) {
      handleUpdatePizza(params.id, data);
    } else {
      handleCreatePizza(data);
    }
  };

  return (
    <>
      <div className="flex justify-center">
        <div className="bg-gray-200 rounded-lg shadow-lg shadow-gray300 p-8 h-4/6 w-4/12 m-auto py-10 px-10 mt-24">
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <div className="flex flex-col gap-4 sm:grid-cols-2 w-full">
              <label htmlFor="nombre"></label>
              <input
                type="text"
                {...register("nombre")}
                placeholder="Nombre"
                aria-label="Nombre"
                id="nombre"
                defaultValue={pizza.nombre}
                className="mt-1 block w-full border-0 p-2"
              />
              {errors.nombre && <p>{errors.nombre.message}</p>}
              <label htmlFor="precio"></label>
              <input
                type="text"
                {...register("precio")}
                placeholder="Precio"
                aria-label="Precio"
                id="precio"
                defaultValue={pizza.precio}
                className="mt01 block w-full border-0 p-2"
              />
              {errors.precio && <p>{errors.precio.message}</p>}
              <label htmlFor="estado"></label>
              <select
                id="estado"
                {...register("estado")}
                defaultValue={pizza.estado}
                className="bg-gray-50 border p-2 border-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="" disabled className="text-black">
                  {" "}
                  Seleccione el estado
                </option>
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </select>
              {errors.estado && <p>{errors.estado.message}</p>}
            </div>
            <button type="submit" className="block bg-indigo-500 px-2 py-1 mt-5 hover:bg-indigo-400 text-white w-full rounded-md">{params.id ? "Actualizar" : "Crear"}</button>
          </form>
          {!params.id ? <p className="ml-20 mt-3">Cree una pizza</p> : <p className="ml-20 mt-3">Edite la pizza</p>}
        </div>
      </div>
    </>
  );
};

export default PizzasForm;
