import styles from "./index.module.scss";
import { MdDashboard } from "react-icons/md";
import Link from "next/link";

function HamburguerMainHome({ handleVisible, visibleVar }) {
  return (
    <div className={styles.mainContainerHamburguer} onClick={handleVisible}>
      <div
        className={`${styles.containerOpacity} ${
          visibleVar ? styles.containerOpacityViwe : null
        }`}
      ></div>
      <div
        className={`${styles.mainContainerHamburguerHome} ${
          visibleVar ? styles.mainContainerHamburguerHomeMove : null
        }`}
      >
        <div className={styles.containerHamburguerHomeUser}>
          <p>Menu</p>
        </div>
        <div className={styles.containerHamburguerHomeCategories}>
          <Link href="/" className={styles.linkHamburguerMenu}>
            <MdDashboard />
            Vista General
          </Link>
        </div>
      </div>
    </div>
  );
}
export default HamburguerMainHome;
