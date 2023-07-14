import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

export const Register = () => {
  const registerSchema = Yup.object().shape({
    nombre: Yup.string()
      .min(3, "Ingresa almenos 3 caracteres")
      .required("El Usuario es obligatorio"),
    password: Yup.string()
      .min(3, "Ingresa almenos 3 caracteres")
      .required("La contraseña es obligatoria"),
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/register",
        values
      );
      console.log("succers", res);
      // dispatch(console.log("succes", "Usuario Registrado"));
      navigate("/login");
    } catch (error) {
      // dispatch(console.log('error', "error al registrar usuario"));
      console.log(error);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  return (
    <div>
      <h1>Registrate</h1>
      <div>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" {...register("nombre")} placeholder="Usuario" />
            {errors.nombre && <p>{errors.nombre.message}</p>}
            <input
              type="password"
              {...register("password")}
              placeholder="Password"
            />
            {errors.password && <p>{errors.password.message}</p>}
            <select {...register("tipo")}>
              <option value="">Seleccionar Tipo</option>
              <option value="STAFF">Staff</option>
              <option value="NORMAL">Normal</option>
            </select>
            <button type="submit">Registrar</button>
          </form>
        </div>
      </div>
    </div>
  );
};
