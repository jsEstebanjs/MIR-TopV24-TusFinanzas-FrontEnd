import styles from "../../styles/pages/Layout.module.scss";
import { FaBars } from "react-icons/fa";
import { MdAdd, MdRemove } from "react-icons/md";
import { useState } from "react";
import HamburguerMainHome from "../HamburguerMainHome";
import AddTransaccionModal from "../AddTransaccionModal";
import UserLogOut from "../UserLogOut";
import { useRouter } from "next/router";

function Layout({ children, title }) {
  const [visibleTransaccionBtn, setVisibleTransaccionBtn] = useState(false);
  const [visibleHamburguer, setVisibleHamburguer] = useState(false);
  const [visibleTransaccion, setVisibleTransaccion] = useState(false);
  const router = useRouter();

  const handleClickAddTransaccion = () => {
    setVisibleTransaccionBtn(!visibleTransaccionBtn);
  };

  const handleClickHamburguer = () => {
    if (window.innerWidth < 1200) {
      setVisibleHamburguer(!visibleHamburguer);
      if (!visibleHamburguer) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style = "initial";
      }
    }
  };

  const handleTransaccion = (title, color, type) => {
    if (title) {
      setVisibleTransaccion({ title, color, type });
      document.body.style.overflow = "hidden";
    } else {
      setVisibleTransaccion(false);
      document.body.style = "initial";
    }
  };

  return (
    <div className={styles.mainContainerVisionGeneral}>
      <HamburguerMainHome
        visibleVar={visibleHamburguer}
        handleVisible={handleClickHamburguer}
      />
      <AddTransaccionModal
        color={visibleTransaccion.color}
        type={visibleTransaccion.type}
        title={visibleTransaccion.title}
        visible={visibleTransaccion}
        handle={handleTransaccion}
      />
      <div className={styles.mainContainerNavVisionGeneral}>
        <div className={styles.containerNavVisionGeneral}>
          <div className={styles.containerIconAndTitle}>
            <span
              onClick={handleClickHamburguer}
              className={styles.NavVisionGeneralIconBars}
            >
              <FaBars />
            </span>
            <h1 className={styles.NavVisionGeneralTitle}>{title}</h1>
          </div>
          <UserLogOut />
        </div>
        {children}
      </div>

      {/* aqui van los btn de entry and spent */}
      {router.pathname !== "/settings" ? (
        <div
          onClick={handleClickAddTransaccion}
          className={styles.containerBtnAddTransaccion}
        >
          <p
            className={`${styles.infoPTransaccionDesktop} ${
              visibleTransaccionBtn
                ? styles.infoPTransaccionDesktopNoView
                : null
            }`}
          >
            Agregar Transaccion
          </p>
          <span className={styles.btnAddTransaccion}>
            <MdAdd
              className={visibleTransaccionBtn ? styles.svgAddRotate : null}
            />
          </span>
          <span
            onClick={() => handleTransaccion("Gasto", "Red", "Expense")}
            className={`${styles.btnAddTransaccion} ${
              styles.btnAddTransaccionSpent
            } ${
              visibleTransaccionBtn ? styles.btnAddTransaccionSpentBottom : null
            }`}
          >
            <p
              className={`${styles.infoBtnAddTransaccion} ${
                visibleTransaccionBtn ? styles.infoBtnAddTransaccionView : null
              }`}
            >
              Gasto
            </p>
            <MdRemove />
          </span>
          <span
            onClick={() => handleTransaccion("Ingreso", "Green", "Entry")}
            className={`${styles.btnAddTransaccion} ${
              styles.btnAddTransaccionEntry
            } ${
              visibleTransaccionBtn ? styles.btnAddTransaccionEntryBottom : null
            }`}
          >
            <p
              className={`${styles.infoBtnAddTransaccion} ${
                visibleTransaccionBtn ? styles.infoBtnAddTransaccionView : null
              }`}
            >
              Ingreso
            </p>

            <MdAdd />
          </span>
        </div>
      ) : null}
    </div>
  );
}
export default Layout;
