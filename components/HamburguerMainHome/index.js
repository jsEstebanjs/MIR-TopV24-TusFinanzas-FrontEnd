import styles from "./index.module.scss";

function HamburguerMainHome({ handleVisible, visibleVar }) {
  
  return (
    <div className={styles.mainContainerHamburguer} onClick={handleVisible}>
      <div className={`${styles.containerOpacity} ${visibleVar ? styles.containerOpacityViwe : null}`}></div>
      <div
        className={`${styles.mainContainerHamburguerHome} ${
          visibleVar ? styles.mainContainerHamburguerHomeMove : null
        }`}
      >
        <div className={styles.containerHamburguerHomeUser}></div>
        <div className={styles.containerHamburguerHomeCategories}></div>
      </div>
    </div>
  );
}
export default HamburguerMainHome;
