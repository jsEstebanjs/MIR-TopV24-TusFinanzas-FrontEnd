import styles from "./index.module.scss";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { donutDataDefault } from "./constants";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { formatterPeso } from '../../utils/formatterPeso';

ChartJS.register(ArcElement, Tooltip, Legend);

function CardResumenHome() {
  const mouths = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  const lastTransaction = useSelector(
    (state) => state.TransaccionsSlice.docs[0]
  );
  const [donutData, setDonutData] = useState(donutDataDefault);

  useEffect(() => {
    if (lastTransaction) {
      setDonutData({
        ...donutDataDefault,
        datasets: [
          {
            ...donutDataDefault.datasets[0],
            data: [lastTransaction?.todoEntry, lastTransaction?.todoExpense, 0],
          },
        ],
      });
    }else{
      setDonutData(donutDataDefault)
    }
  }, [lastTransaction]);

  const transactionDate = lastTransaction?.createdAt
    ? new Date(lastTransaction.createdAt)
    : null;

  return (
    <div className={styles.mainContainerCardResumen}>
      <h2 className={styles.mainContainerCardTitle}>Resumen</h2>
      <h3 className={styles.mainContainerCardMonth}>
        {!transactionDate
          ? "Ninguna"
          : `${mouths[transactionDate.getMonth()]
            } ${transactionDate.getFullYear()}`}
      </h3>
      <div className={styles.mainContainerCardEntryAndSpent}>
        <div className={styles.containerChartCardResumen}>
          <Doughnut
            data={donutData}
            options={{
              responsive: true,
            }}
          />
        </div>
        <div className={styles.containerPricesCardResumen}>
          <div className={styles.containerInfoEntrysOrSpents}>
            <p>Ingresos: </p>
            <p>Gastos: </p>
            <p>Total: </p>
          </div>
          <div>
            <p className={styles.pInfoCardEntry}>
              {!transactionDate ? "$0.00" : formatterPeso.format(lastTransaction.todoEntry)}
            </p>
            <p className={styles.pInfoCardSpent}>
              {!transactionDate ? "$0.00" : formatterPeso.format(lastTransaction.todoExpense)}
            </p>
            <p className={styles.pInfoResult}>
              {!transactionDate ? "$0.00" :formatterPeso.format(lastTransaction.balance)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CardResumenHome;
