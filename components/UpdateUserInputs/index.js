import styles from "./index.module.scss";
import { useState } from "react";
import { updateUser } from "../../utils/updateUser";
import { useDispatch } from "react-redux";
import { updateName } from "../../store/user.Slice";
import { Ring } from "@uiball/loaders";

function UpdateUserInputs({
  length,
  exp,
  value,
  label,
  type,
  errorMessage,
  objKey,
}) {
  const [valueInput, setValueInput] = useState(value);
  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState(false);
  const [loaderFetch, setLoaderFetch] = useState(false);
  const dispatch = useDispatch();

  const updateUserFetch = async () => {
    if (exp.test(valueInput) && valueInput.length >= length) {
      if (valueInput === value) {
        return;
      } else {
        setLoaderFetch(true)
        const res = await updateUser({ [objKey]: valueInput });
        dispatch(updateName({ key: objKey, value: res.data.data[objKey] }));
        setLoaderFetch(false)
      }
      setIsVisible(false);
    }
  };
  const verifyValue = (e) => {
    if (!exp.test(e.target.value)) {
      setError(true);
    } else {
      setError(false);
    }
    setValueInput(e.target.value);
  };

  return (
    <div className={styles.mainContainerUpdateUserInputs}>
      <div className={styles.containerLabelAndEdit}>
        <p className={styles.labelAndValue}>{label}</p>
        {!isVisible ? (
          <p className={styles.btnEdit} onClick={() => setIsVisible(true)}>
            Editar
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
          {loaderFetch ? (
            <div className={styles.containerLoader}>
              <Ring size={35} color="#050505" />
            </div>
          ) : null}
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
