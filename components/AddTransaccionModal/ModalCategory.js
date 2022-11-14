import styles from "./ModalCategory.module.scss";
import Image from "next/image";
import { MdKeyboardArrowDown } from "react-icons/md";
import ModalSubCategory from "./ModalSubCategory";
import { useState } from "react";

function ModalCategory({ src, name, id, func,sub,handleSelectSubCategory }) {
  const [divCategories, setDivCategories] = useState(false);

  return (
    <div
      onClick={() => setDivCategories(!divCategories)}
      className={styles.mainContainerModalCategory}
    >
      <div className={styles.containerModalCategory}>
        <div className={styles.containerModalCategoryImg}>
          <Image width={50} height={50} alt={name} src={src} />
          <h1 className={styles.titleModalCategory}>{name}</h1>
        </div>
        <MdKeyboardArrowDown
          className={`${divCategories ? styles.rotateArrowSVG : null}`}
        />
      </div>

      <div
        onClick={func}
        className={`${styles.mainContainerSubCategories} ${
          divCategories ? styles.mainContainerSubCategoriesVisible : null
        } `}
      >{
        sub.map((item)=>(
            <ModalSubCategory 
            id={item._id}
            key={item._id}
            src={item.favicon} 
            title={item.name}
            handleSelectSubCategory={handleSelectSubCategory}
            />
        ))
      }
      </div>
    </div>
  );
}
export default ModalCategory;
