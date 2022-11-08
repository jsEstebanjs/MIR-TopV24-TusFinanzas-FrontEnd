import styles from "./SelectCategory.module.scss";
import ModalCategory from "./ModalCategory";
import { useSelector } from "react-redux";

function SelectCategory({ handle, visible, handleSelectSubCategory, type }) {
  const categories = useSelector((state) => state.UserSlice.categoriesIds);
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
          {categories.map((item) => {
            if (item.type === type) {
              return (
                <ModalCategory
                  id={item._id}
                  key={item._id}
                  handleSelectSubCategory={handleSelectSubCategory}
                  func={handle}
                  src={item.favicon}
                  name={item.name}
                  sub={item.subcategoriesIds}
                />
              );
            }
          })}
        </div>
      </div>
    </>
  );
}
export default SelectCategory;
