import styles from "./index.module.scss";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { donutData } from './constants';

ChartJS.register(ArcElement, Tooltip, Legend);

function CardResumenHome() {

  return (
    <div className={styles.mainContainerCardResumen}>
      <h2 className={styles.mainContainerCardTitle}>Resumen</h2>
      <h3 className={styles.mainContainerCardMonth}>Noviembre 2022</h3>
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
            <p className={styles.pInfoCardEntry}>$0.00</p>
            <p className={styles.pInfoCardSpent}>$0.00</p>
            <p className={styles.pInfoResult}>$0.00</p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CardResumenHome;
