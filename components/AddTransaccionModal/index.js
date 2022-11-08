import styles from "./index.module.scss";
import { useForm } from "react-hook-form";
import SelectCategory from "./SelectCategory";
import Image from "next/image";
import imgPlaceHolder from "./imagen.png";
import { useState } from "react";
import { createTransaccion } from "../../utils/createTransaccion";
import { useDispatch } from "react-redux";
import { pushTransactionsIds } from "../../store/user.Slice";
import { Ring } from "@uiball/loaders";
import  ErrorLoginAndRegister  from "../ErrorLoginAndRegister";

function AddTransaccionModal({ color, type, title, visible, handle }) {
  const [category, setCategory] = useState(false);
  const [objTransaccion, setObjTransaccion] = useState({});
  const [verifyCategory, setVerifiCategory] = useState(false);
  const [loader, setLoader] = useState(false);
  const [verifyTransaccion, setVerifyTransaccion] = useState(false);
  const dispatch = useDispatch();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const SubmitForm = async (data) => {
    if (
      objTransaccion.name === "Seleccionar Categoria" ||
      objTransaccion.name === undefined
    ) {
      setVerifiCategory(true);
      return;
    } else {
      setLoader(true);
      setVerifiCategory(false);
    }
    const { id } = objTransaccion;
    data.amount = Math.abs(data.amount);
    const body = { ...data, subcategoryId: id };
    const res = await createTransaccion(body);
    if (res instanceof Object) {
      dispatch(pushTransactionsIds(res.data.data));
      reset({ amount: "", name: "", description: "" });
      setObjTransaccion({ name: "Seleccionar Categoria" });
      handle(false)
    } else {
      setVerifyTransaccion(res)
    }
    setLoader(false);
  };

  const handleCategoryModal = () => {
    setCategory(!category);
  };

  const handleSelectSubCategory = (img, name, id) => {
    setObjTransaccion({ ...objTransaccion, img, name, id });
  };
  const handleVerifyTransaccion = ()=>{
    setVerifyTransaccion(false)
  }
  return (
    <>
        <ErrorLoginAndRegister
          errorMessage={verifyTransaccion}
          active={verifyTransaccion}
          handle={handleVerifyTransaccion}
        />
      <SelectCategory
        type={type}
        handle={handleCategoryModal}
        visible={category}
        handleSelectSubCategory={handleSelectSubCategory}
      />
      <div
        onClick={() => {
          setObjTransaccion({ name: "Seleccionar Categoria" });
          handle(false);
          reset({
            amount: "",
            name: "",
            description: "",
          });
        }}
        className={`${styles.containerOpacity} ${
          visible.title ? styles.containerOpacityVisible : null
        }`}
      ></div>
      <div
        className={`${styles.mainContainerAddTransaccionModal} ${
          visible.title ? styles.mainContainerAddTransaccionModaVisible : null
        }`}
      >
        {loader ? (
          <div className={styles.containerLoader}>
            <Ring size={35} color="#050505" />
          </div>
        ) : null}
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
              <div className={styles.containerImgAndCategory}>
                <Image
                  width={50}
                  height={50}
                  alt={objTransaccion.name}
                  src={objTransaccion.img ? objTransaccion.img : imgPlaceHolder}
                />
                <input
                  onClick={handleCategoryModal}
                  className={styles.inputCategories}
                  id="categories"
                  type="text"
                  readOnly
                  placeholder="Seleccionar Categoria"
                  value={
                    objTransaccion.name === undefined
                      ? "Seleccionar Categoria"
                      : objTransaccion.name
                  }
                  {...register("categories", {
                    required: true,
                  })}
                />
              </div>
              {verifyCategory ? (
                <p className={styles.errorInfoForm}>Escoge una Categoria</p>
              ) : null}
              {errors.categories?.type === "required" && (
                <p className={styles.errorInfoForm}>Escoge una Categoria</p>
              )}
            </div>
            <div className={styles.containerLabelAndInputFormAuth}>
              <label htmlFor="amount">Valor</label>
              <input
                id="amount"
                type="number"
                {...register("amount", {
                  required: true,
                  min: 1000,
                  pattern: /^[0-9]/,
                })}
              />
              {errors.amount?.type === "required" && (
                <p className={styles.errorInfoForm}>Ingresa un valor</p>
              )}
              {errors.amount?.type === "min" && (
                <p className={styles.errorInfoForm}>El valor minimo es 1000</p>
              )}
              {errors.amount?.type === "pattern" && (
                <p className={styles.errorInfoForm}>Solo se admiten numeros</p>
              )}
            </div>
            <div className={styles.containerLabelAndInputFormAuth}>
              <label htmlFor="description">Notas (Opcional)</label>
              <textarea id="description" {...register("description")} />
            </div>
            <div className={styles.containerBtnForm}>
              <button
                type="button"
                onClick={() => {
                  reset({
                    amount: "",
                    name: "",
                    description: "",
                  });
                  setObjTransaccion({});
                  handle(false);
                }}
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
