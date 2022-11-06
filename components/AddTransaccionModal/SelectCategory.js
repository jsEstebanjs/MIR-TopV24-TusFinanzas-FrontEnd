import styles from "./SelectCategory.module.scss";
import ModalCategory from "./ModalCategory";
function SelectCategory({ handle, visible }) {
  return (
    <>
      <div
        onClick={handle}
        className={`${styles.containerOpacity} ${
          visible ? styles.containerOpacityVisible : null
        }`}
      ></div>
      <div
        className={`${styles.mainContainerSelectCategory} ${
          visible ? styles.mainContainerSelectCategoryVisible : null
        }`}
      >
        <h2 className={styles.titleContainerSelectCategory}>
          Selecciona una Categoria
        </h2>
        <ModalCategory />


      </div>
    </>
  );
}
export default SelectCategory;
