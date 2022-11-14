import styles from "./ModalSubCategory.module.scss";
import Image from "next/image";

function ModalSubCategory({ src, title, id, handleSelectSubCategory }) {
  return (
    <div
      onClick={() => handleSelectSubCategory(src, title,id)}
      className={styles.mainContainerModalSubCategory}
    >
      <Image height={40} width={40} src={src} alt={title} />
      <h3 className={styles.titleContainerModalSubCategory}>{title}</h3>
    </div>
  );
}
export default ModalSubCategory;
