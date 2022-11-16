import styles from "./index.module.scss";
import { useState } from "react";

function UpdateUserInputs({ length, exp, value, label, type, errorMessage }) {
  const [valueInput, setValueInput] = useState(value);
  const [isVisible, setIsVisible] = useState(false);
  const [error,setError] = useState(false)

  const updateUserFetch = () => {
    if (exp.test(valueInput) && valueInput.length >= length) {
      console.log("funciona");
      setIsVisible(false);
    }
  };
  const verifyValue = (e)=>{
    if(!exp.test(e.target.value)){
        setError(true)
    }else{
        setError(false)
    }
    setValueInput(e.target.value)
  }

  return (
    <div className={styles.mainContainerUpdateUserInputs}>
      <div className={styles.containerLabelAndEdit}>
        <p className={styles.labelAndValue}>{label}</p>
        {!isVisible ? (
          <p className={styles.btnEdit} onClick={() => setIsVisible(true)}>
            Edit
          </p>
        ) : null}
      </div>
      {isVisible ? (
        <div className={styles.containerUpdate}>
          <input
            type={type}
            className={styles.inputContainerUpdate}
            value={valueInput}
            onChange={(e) => verifyValue(e)}
          />
          {error ? <p className={styles.errorMessage}>{errorMessage}</p> : null}
          <div className={styles.containerBtnSaveAndCancel}>
            <button className={styles.btnSave} onClick={updateUserFetch}>
              Guardar
            </button>
            <button
              className={styles.btnCancel}
              onClick={() => {
                setIsVisible(false);
                setValueInput(value);
              }}
            >
              Cancelar
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.containerValue}>
          <p className={styles.labelAndValue}>{value}</p>
        </div>
      )}
    </div>
  );
}
export default UpdateUserInputs;
