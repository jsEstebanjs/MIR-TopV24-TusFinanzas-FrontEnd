import styles from "./index.module.scss";
import { useForm } from "react-hook-form";

function AddTransaccionModal({ color, type, title, visible, handle }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const SubmitForm = async (data) => {};

  return (
    <>
      <div
        onClick={() => handle(false)}
        className={`${styles.containerOpacity} ${
          visible.title ? styles.containerOpacityVisible : null
        }`}
      ></div>
      <div
        className={`${styles.mainContainerAddTransaccionModal} ${
          visible.title ? styles.mainContainerAddTransaccionModaVisible : null
        }`}
      >
        <h2
          className={`${styles.titleContainerAddTransaccionModal} ${
            color === "Green" ? styles.colorGreen : styles.colorRed
          }`}
        >
          {title}
        </h2>
        <div className={styles.mainContainerFormTransaccion}>
          <form
            className={styles.containerFormAuth}
            onSubmit={handleSubmit(SubmitForm)}
          >
            <div className={styles.containerLabelAndInputFormAuth}>
              <label htmlFor="categories">Categoria</label>
              <input
                className={styles.inputCategories}
                id="categories"
                type="text"
                disabled
                value="Seleccionar Categoria"
                {...register("categories", {
                  required: true,

                })}
              />
              {errors.categories?.type === "required" && (
                <p className={styles.errorP}>Escoge una Categoria</p>
              )}
            </div>
            <div className={styles.containerLabelAndInputFormAuth}>
              <label htmlFor="amount">Valor</label>
              <input
                id="amount"
                type="number"
                {...register("amount", {
                  required: true,
                  min: 1,
                  pattern: /^[0-9]/,
                })}
              />
              {errors.amount?.type === "required" && (
                <p className={styles.errorP}>Ingresa un valor</p>
              )}
              {errors.amount?.type === "min" && (
                <p className={styles.errorP}>El valor minimo es 1</p>
              )}
              {errors.amount?.type === "pattern" && (
                <p className={styles.errorP}>Solo se admiten numeros</p>
              )}
            </div>
            <div className={styles.containerLabelAndInputFormAuth}>
              <label htmlFor="name">De (Opcional)</label>
              <input
                id="name"
                type="text"
                {...register("name", {
                  required: false,
                })}
              />
            </div>

            <div className={styles.containerLabelAndInputFormAuth}>
              <label htmlFor="description">Notas (Opcional)</label>
              <textarea id="description" {...register("description")} />
            </div>
            <div className={styles.containerBtnForm}>
              <button
                type="button"
                onClick={() => handle(false)}
                className={`${styles.btnCancelForm} ${
                  color === "Green"
                    ? styles.btnCancelGreen
                    : styles.btnCancelRed
                }`}
              >
                Cancelar
              </button>
              <button
                className={`${styles.btnSubmitForm} ${
                  color === "Green"
                    ? styles.btnSubmitFormGreen
                    : styles.btnSubmitFormRed
                }`}
                type="submit"
              >
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
export default AddTransaccionModal;
