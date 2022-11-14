import styles from "./index.module.scss";
import { MdDashboard,MdList } from "react-icons/md";
import Link from "next/link";
import { useRouter } from "next/router";

function HamburguerMainHome({ handleVisible, visibleVar }) {
  const router = useRouter()
  return (
    <div className={styles.mainContainerHamburguer} >
      <div
      onClick={handleVisible}
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
          <Link onClick={handleVisible} href="/" className={`${styles.linkHamburguerMenu} ${router.pathname === "/" ? styles.selectLinkHamburguerMenu : null}`}>
            <MdDashboard />
            Vista General
          </Link>
          <Link onClick={handleVisible} href="/transactions" className={`${styles.linkHamburguerMenu} ${router.pathname === "/transactions" ? styles.selectLinkHamburguerMenu : null}`}>
            <MdList />
            Transacciones
          </Link>
        </div>
      </div>
    </div>
  );
}
export default HamburguerMainHome;
