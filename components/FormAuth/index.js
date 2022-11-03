import { useForm } from "react-hook-form";

function FormAuth() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const SubmitForm = (data) => {
    console.log(data)
  };

  return (
    <div>
      <form onSubmit={handleSubmit(SubmitForm)}>
        <div>
          <label htmlFor="name">Nombre</label>
          <input
            id="name"
            type="text"
            {...register("name", {
              required: true,
              maxLength: 100,
              minLength: 3,
              pattern:/^([A-ZÑÁÉÍÓÚÜ]||[a-zñáéíóú]+[\s]*)+$/
            })}
          />
          {errors.name?.type === "required" && (
            <p>El campo nombre es requerido</p>
          )}
          {errors.name?.type === "maxLength" && (
            <p>La longitud maxima del nombre es de 100 caracteres</p>
          )}
          {errors.name?.type === "minLength" && (
            <p>La longitud minima del nombre es de 3 caracteres</p>
          )}
           {errors.name?.type === "pattern" && (
            <p>El nombre no es valido</p>
          )}
        </div>

        <div>
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
            <p>El campo del Email es requerido</p>
          )}
          {errors.email?.type === "pattern" && <p>El email no es valido</p>}
        </div>

        <div>
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
            <p>
                La contraseña es requerida
            </p>
          )}
          
          {errors.password?.type === "pattern" && (
            <p>
              La contraseña debe tener entre 8 y 16 caracteres, con al menos un
              dígito, al menos una letra minúscula y al menos una letra
              mayúscula. NO puede tener otros símbolos.
            </p>
          )}

        </div>
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
}
export default FormAuth;
