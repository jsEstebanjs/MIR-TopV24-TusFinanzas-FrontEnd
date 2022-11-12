import styles from "../styles/pages/Home.module.scss";
import { FaBars } from "react-icons/fa";
import { MdAdd, MdRemove } from "react-icons/md";
import { useEffect, useState } from "react";
import HamburguerMainHome from "../components/HamburguerMainHome";
import CardResumenHome from "../components/CardResumenHome";
import ChartOfAccounts from "../components/ChartOfAccounts";
import BalanceCard from "../components/BalanceCard";
import CardTransaccions from "../components/CardTransaccions";
import AddTransaccionModal from "../components/AddTransaccionModal";
import axios from "axios";
import { useDispatch } from "react-redux";
import { pushDocs } from "../store/transaccions.Slice";

export default function Home() {
  const [visibleTransaccionBtn, setVisibleTransaccionBtn] = useState(false);
  const [visibleHamburguer, setVisibleHamburguer] = useState(false);
  const [visibleTransaccion, setVisibleTransaccion] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    async function lastTransaccions() {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/transactions?limit=10&page=1`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      dispatch(pushDocs(res.data.data.docs));
    }
    if(localStorage.getItem("token")){
      lastTransaccions();
    }
  }, []);
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
    } else {
      setVisibleTransaccion(false);
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
          <span
            onClick={handleClickHamburguer}
            className={styles.NavVisionGeneralIconBars}
          >
            <FaBars />
          </span>
          <h1 className={styles.NavVisionGeneralTitle}>Vista General</h1>
        </div>
        <div className={styles.mainContainerVisionGeneralTwo}>
          <CardResumenHome />
          <ChartOfAccounts />
          <BalanceCard  />
          <CardTransaccions />
        </div>
      </div>

      {/* aqui van los btn de entry and spent */}
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
    </div>
  );
}

export async function getStaticProps(context) {
  return {
    props: {
      private: true,
    },
  };
}
