import styles from "./SelectCategory.module.scss";
import ModalCategory from "./ModalCategory";
import { categories } from "./constands";

function SelectCategory({ handle, visible , handleSelectSubCategory}) {
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
        <div className={styles.containerSelectCategory}>
          {categories.map((item) => (
            <ModalCategory
              handleSelectSubCategory={handleSelectSubCategory}
              func={handle}
              src={item.favicon}
              name={item.name}
              sub={item.subcategories}
            />
          ))}
        </div>
      </div>
    </>
  );
}
export default SelectCategory;
