import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { updatePizza, getPizza, createPizza } from "../api/pizzas";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

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
      <div>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="nombre"></label>
              <input
                type="text"
                {...register("nombre")}
                placeholder="Nombre"
                aria-label="Nombre"
                id="nombre"
                defaultValue={pizza.nombre}
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
              />
              {errors.precio && <p>{errors.precio.message}</p>}
              <label htmlFor="estado"></label>
              <select
                id="estado"
                {...register("estado")}
                defaultValue={pizza.estado}
              >
                <option value="" disabled>
                  {" "}
                  Seleccione el estado
                </option>
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </select>
              {errors.estado && <p>{errors.estado.message}</p>}
            </div>
            <button type="submit">{params.id ? "Actualizar" : "Crear"}</button>
          </form>
          {!params.id ? "Cree una pizza" : "Edite la pizza"}
        </div>
      </div>
    </>
  );
};

export default PizzasForm;
