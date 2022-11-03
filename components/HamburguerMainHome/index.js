import styles from "./index.module.scss";

function HamburguerMainHome({handleVisible}) {
  return (

    <div onClick={handleVisible}>
      <div className={styles.containerOpacity}></div>
      <div className={styles.mainContainerHamburguerHome}>
        <div className={styles.containerHamburguerHomeUser}></div>
        <div className={styles.containerHamburguerHomeCategories}></div>
      </div>
      </div>

  );
}
export default HamburguerMainHome;
