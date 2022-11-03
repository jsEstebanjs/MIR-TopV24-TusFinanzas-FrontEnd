import styles from "../styles/pages/Home.module.scss";
import { FaBars } from "react-icons/fa";
import { MdAdd, MdRemove } from "react-icons/md";
import { useState } from "react";
import HamburguerMainHome from "../components/HamburguerMainHome";
import CardResumenHome from "../components/CardResumenHome";

export default function Home() {
  const [visibleTransaccionBtn, setVisibleTransaccionBtn] = useState(false);
  const [visibleHamburguer, setVisibleHamburguer] = useState(false);

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

  return (
    <div className={styles.mainContainerVisionGeneral}>
      <HamburguerMainHome
        visibleVar={visibleHamburguer}
        handleVisible={handleClickHamburguer}
      />
      <div className={styles.mainContainerNavVisionGeneral}>
        <div className={styles.containerNavVisionGeneral}>
          <span
            onClick={handleClickHamburguer}
            className={styles.NavVisionGeneralIconBars}
          >
            <FaBars />
          </span>
          <h1 className={styles.NavVisionGeneralTitle}>Vista General</h1>
        </div>
          <div className={styles.mainContainerVisionGeneral}>

            <CardResumenHome  />
          </div>
      </div>

      <div
        onClick={handleClickAddTransaccion}
        className={styles.containerBtnAddTransaccion}
      >
        <p
          className={`${styles.infoPTransaccionDesktop} ${
            visibleTransaccionBtn ? styles.infoPTransaccionDesktopNoView : null
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
    </div>
  );
}
