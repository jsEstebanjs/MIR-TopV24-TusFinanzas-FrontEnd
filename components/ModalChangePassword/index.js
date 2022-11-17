import styles from "./index.module.scss";
import { updateUser } from "../../utils/updateUser";
import { useState } from "react";
import { useRouter } from "next/router";
import ErrorLoginAndRegister from "../ErrorLoginAndRegister";

function ModalChangePassword({ visible, funcVisible }) {
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorChangePassword,setErrorChangePassword] = useState("")
  const router = useRouter()

  const handleSubmitChangePassword = async () => {
    if (/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/.test(newPassword)) {
      setError(false);
      const res = await updateUser({ oldPassword, password: newPassword });
      if(res !== false){
        localStorage.removeItem("token")
        router.push("/login")
        setNewPassword("")
        setOldPassword("")
      }else{
        errorChangeNewPassword("Error al actualizar la contraseña")
      }
    } else {
      setError(true);
    }
  };
  const changeInput = (e) => {
    setNewPassword(e.target.value);
    if (/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/.test(e.target.value)) {
      setError(false);
    } else {
      setError(true);
    }
  };

  const cancelChangePassword = () => {
    setNewPassword("");
    setOldPassword("");
    funcVisible();
  };

  const errorChangeNewPassword = (value) => {
    setErrorChangePassword(value)
  }

  return (
    <>
    <ErrorLoginAndRegister errorMessage={errorChangePassword} active={errorChangePassword} handle={errorChangeNewPassword}/>
      <div
        onClick={funcVisible}
        className={`${styles.opacity} ${
          visible ? styles.opacityVisible : null
        }`}
      ></div>
      <div
        className={`${styles.mainContainerModalChangePassword} ${
          visible ? styles.mainContainerModalChangePasswordVisible : null
        }`}
      >
        <h2>Cambiar Contraseña</h2>
        <label htmlFor="oldPassword">Contraseña actual</label>
        <input
          value={oldPassword}
          type="password"
          id="oldPassword"
          onChange={(e) => setOldPassword(e.target.value)}
        />

        <label htmlFor="newPassword">Nueva contraseña</label>
        <input
          value={newPassword}
          type="password"
          id="newPassword"
          onChange={(e) => changeInput(e)}
        />
        {error ? (
          <p className={styles.errorP}>
            La contraseña debe tener entre 8 y 16 caracteres, con al menos un
            dígito, al menos una letra minúscula y al menos una letra mayúscula.
            NO puede tener otros símbolos.
          </p>
        ) : null}
        <div className={styles.containerBtsSaveAndCancel}>
          <button
            onClick={handleSubmitChangePassword}
            className={styles.btnSaveNewPassword}
          >
            Guardar
          </button>
          <button
            className={`${styles.btnSaveNewPassword} ${styles.btnCancelNewPassword}`}
            onClick={cancelChangePassword}
          >
            Cancelar
          </button>
        </div>
      </div>
    </>
  );
}
export default ModalChangePassword;
