import { useForm } from "react-hook-form";
import styles from "./index.module.scss";
import { loginAndRegister } from "../../utils/loginAndRegister";
import ErrorLoginAndRegister from "../ErrorLoginAndRegister";
import { useState } from "react";
import { useRouter } from "next/router";
import { Ring } from "@uiball/loaders";

function FormAuth({ btn, isName, url }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleErrorModal = (message) => {
    setError(message);
  };

  const SubmitForm = async (data) => {
    setLoader(true);
    const result = await loginAndRegister(url, data);
    if (result instanceof Object) {
      localStorage.setItem("token", result.data.data.token);
      router.push("/");
      // window.location.href = "http://localhost:3000/" 
    } else {
      handleErrorModal(result);
    }
    setLoader(false);
  };

  return (
    <div className={styles.mainContainerFormAuth}>
      {loader ? (
        <div className={styles.containerLoader}>
          <Ring size={35} color="#050505" />
        </div>
      ) : null}
      <ErrorLoginAndRegister
        handle={handleErrorModal}
        errorMessage={error}
        active={error}
      />
      <form
        className={styles.containerFormAuth}
        onSubmit={handleSubmit(SubmitForm)}
      >
        {isName === true ? (
          <div className={styles.containerLabelAndInputFormAuth}>
            <label htmlFor="name">Nombre</label>
            <input
              id="name"
              type="text"
              {...register("name", {
                required: true,
                maxLength: 100,
                minLength: 3,
                pattern: /^([A-ZÑÁÉÍÓÚÜ]||[a-zñáéíóú]+[\s]*)+$/,
              })}
            />
            {errors.name?.type === "required" && (
              <p className={styles.errorP}>El campo nombre es requerido</p>
            )}
            {errors.name?.type === "maxLength" && (
              <p className={styles.errorP}>
                La longitud maxima del nombre es de 100 caracteres
              </p>
            )}
            {errors.name?.type === "minLength" && (
              <p className={styles.errorP}>
                La longitud minima del nombre es de 3 caracteres
              </p>
            )}
            {errors.name?.type === "pattern" && (
              <p className={styles.errorP}>El nombre no es valido</p>
            )}
          </div>
        ) : null}

        <div className={styles.containerLabelAndInputFormAuth}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            {...register("email", {
              required: true,
              pattern: /\S+@\S+\.\S+/,
            })}
          />
          {errors.email?.type === "required" && (
            <p className={styles.errorP}>El campo del Email es requerido</p>
          )}
          {errors.email?.type === "pattern" && (
            <p className={styles.errorP}>El email no es valido</p>
          )}
        </div>

        <div className={styles.containerLabelAndInputFormAuth}>
          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            type="password"
            {...register("password", {
              required: true,
              pattern: /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/,
            })}
          />
          {errors.password?.type === "required" && (
            <p className={styles.errorP}>La contraseña es requerida</p>
          )}

          {errors.password?.type === "pattern" && (
            <p className={styles.errorP}>
              La contraseña debe tener entre 8 y 16 caracteres, con al menos un
              dígito, al menos una letra minúscula y al menos una letra
              mayúscula. NO puede tener otros símbolos.
            </p>
          )}
        </div>
        <button className={styles.btnSubmitForm} type="submit">
          {btn}
        </button>
      </form>
    </div>
  );
}
export default FormAuth;
