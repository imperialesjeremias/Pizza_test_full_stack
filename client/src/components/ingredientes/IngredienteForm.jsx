import { fetchIngredientes } from "../../feactures/ingredientes/ingredientesSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getIngrediente, updatedIngrediente } from "../../api/ingrediente";
import { verify } from "../../checkType/verify";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

export const IngredientesForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(
      Yup.object().shape({
        nombre: Yup.string().required("El nombre es obligatorio"),
        categoria: Yup.string().required("Seleccione una categoría"),
      })
    ),
  });

  const [ing, setIng] = useState({
    nombre: "",
    categoria: "",
  });

  const dispatch = useDispatch();
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const isEditPage = location.pathname.includes("/edit");

  const handleCreate = async (values) => {
    const token = localStorage.getItem("token");
    const basicToken = localStorage.getItem("basicToken");
    const headers = {
      Accept: "application/json",
      Authorization: verify(basicToken, token),
    };
    try {
      await axios.post(`http://localhost:3000/api/ingredientes`, values, {
        headers,
      });
      dispatch(fetchIngredientes());
      console.log("Succes ingrediente agregado");
      navigate("/ingredientes");
    } catch (error) {
      console.log("error", "internal server error");
    }
  };

  const handleUpdate = async (id, values) => {
    try {
      await updatedIngrediente(id, values);
      console.log("success", "Ingrediente actualizado");
      navigate("/ingredientes");
    } catch (error) {
      if (error.response && error.response.status === 401)
        console.log("error", "No estas autorizado para realizar esta acción");
    }
  };

  useEffect(() => {
    const loadIng = async () => {
      if (isEditPage) {
        const res = await getIngrediente(params.id);
        setIng({
          nombre: res.data.result.nombre,
          categoria: res.data.result.categoria,
        });
        setValue("nombre", res.data.result.nombre);
        setValue("categoria", res.data.result.categoria);
      }
    };
    loadIng();
  }, [params.id, isEditPage, setValue]);

  const onSubmit = (data) => {
    if (isEditPage) {
      handleUpdate(params.id, data);
    } else {
      handleCreate(data);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          {...register("nombre")}
          placeholder="Nombre"
          defaultValue={ing.nombre}
        />
        {errors.nombre && <p>{errors.nombre.message}</p>}
        <select {...register("categoria")} defaultValue={ing.categoria}>
          <option value="">Seleccione una categoría</option>
          <option value="Basico">Básico</option>
          <option value="Premium">Premium</option>
        </select>
        {errors.categoria && <p>{errors.categoria.message}</p>}
        <button type="submit">Add</button>
      </form>
      {!params.id ? "Cree un ingrediente" : "Edite el ingrediente"}
    </div>
  );
};
