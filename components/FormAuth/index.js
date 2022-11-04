import { useForm } from "react-hook-form";
import styles from "./index.module.scss";
import { loginAndRegister } from '../../utils/loginAndRegister';

function FormAuth({ btn, isName,url }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const SubmitForm = async(data) => {
    const result = await loginAndRegister(url,data);
    localStorage.setItem("token", result.data.data.token);
  };

  return (
    <div className={styles.mainContainerFormAuth}>
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
          {errors.email?.type === "pattern" && <p className={styles.errorP}>El email no es valido</p>}
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
