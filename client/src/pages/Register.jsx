import axios from "axios";
import { Formik, Form, Field } from "formik";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

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

    const handleSubmit = async (values) => {
        
        try {
            const res = await axios.post("http://localhost:3000/api/auth/register", values);
            console.log("succers", res)
            // dispatch(console.log("succes", "Usuario Registrado"));
            navigate("/login");
        } catch (error) {
            // dispatch(console.log('error', "error al registrar usuario"));
            console.log(error)
        }
    };

    return (
        <div>
            <h1>Registrate</h1>
            <div>
                <div>
                    <Formik validationSchema={registerSchema} initialValues={{ nombre: "", password: "", tipo: ""}} onSubmit={async (values, action) => {
                        await handleSubmit(values);
                        action.resetForm();
                    }}>
                        <Form>
                            <Field type="text" name="nombre" placeholder="Usuario"/>
                            <Field type="password" name="password" placeholder="Password"/>
                            <Field as="select" name="tipo">
                                <option value="">Seleccionar Tipo</option>
                                <option value="STAFF">Staff</option>
                                <option value="NORMAL">Normal</option>
                            </Field>
                            <button type="submit">
                                Registrar
                            </button>
                        </Form>
                    </Formik>
                </div>
            </div>
        </div>
    );
};