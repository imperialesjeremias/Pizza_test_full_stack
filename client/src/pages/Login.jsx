import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  login,
  loginBasic,
  setAuthData,
  setAuthBasic,
} from "../feactures/auth/authSlice";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";


export const  Login = () => {  
  const { register, handleSubmit, formState: { errors },} = useForm({
    resolver: yupResolver(Yup.object().shape({
      nombre: Yup.string().required("El correo electronico es obligatorio"),
      password: Yup.string().required("La contraseña es obligatoria")
    }))
  });

  const [auth, setAuth] = useState("");
  const [nombre, setNombre] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAuth = (e) => {
    setAuth(e.target.value);
  };
  const handleUsuarioChange = (e) => {
    setNombre(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => { 
    if (!auth) {
      console.log("error", "Seleccione el tipo de autenticación");
      return;
    } else if (!nombre || !password) {
      console.log("error", "ingrese usuario y contraseña");
      return;
    } else {
      if (!nombre && !password) {
        // return console.log("campos incompletos");
      }
      try {
        if (auth === "jwt") {
          const res = await dispatch(login({ nombre, password }));
          if (res.error && res.error.code === "ERR_BAD_REQUEST")
            console.log("error", "usuario o contraseña incorrectos");
          dispatch(setAuthData(res.payload));
        } else if (auth === "basic") {
          const res = await dispatch(loginBasic({ nombre, password }));
          if (res.error && res.error.code === "ERR_BAD_REQUEST")
            console.log("error", "usuario o contraseña incorrectos");
          dispatch(setAuthBasic(res.payload));
        }
        navigate("/");
        console.log("Succes", "Usuario autenticado correctamente");
      } catch (error) {
        console.log("error", "internal server error");
      }
    }
  };

  return (
    <section>
      <div>
        <div>
          <h1>Ingrese sus credenciales</h1>
          <form onSubmit={handleSubmit(handleLogin)}>
            <div>
              <label htmlFor="nombre">Ingrese tu usuario</label>
              <input
                type="text"
                {...register("nombre")}
                placeholder="Escribe tu usuario"
                onChange={handleUsuarioChange}
                required=""
              />
            </div>
            <div>
              <label htmlFor="password">Ingrese tu contraseña</label>
              <input
                type="password"
                {...register("password")}
                onChange={handlePasswordChange}
                required=""
              />
            </div>
            <div>
              <div>
                <div>
                  <input
                    type="checkbox"
                    id="basic-auth"
                    value="basic"
                    {...register("basic-auth")}
                    onChange={handleAuth}
                    checked={auth === "basic"}
                    required=""
                  />
                </div>
                <div>
                  <label htmlFor="basic-auth">Basic Auth</label>
                </div>
              </div>
              <div>
                <div>
                  <input
                    type="checkbox"
                    value="jwt"
                    {...register("auth")}
                    onChange={handleAuth}
                    checked={auth === "jwt"}
                    required=""
                  />
                </div>
                <div>
                  <label htmlFor="jwt-auth">Auth JWT</label>
                </div>
              </div>
            </div>
            <button
              type="submit"

            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
