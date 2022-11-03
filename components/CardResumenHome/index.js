import styles from "./index.module.scss";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function CardResumenHome() {
  const data = {
    labels: [],
    datasets: [
      {
        label: "# of Votes",
        data: [0, 0, 10],
        backgroundColor: [
          "#117D10",
          "#F44236",
          "#AFACAC",
        ],
        borderColor: [
          "#117D10",
          "#F44236",
          "#AFACAC",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className={styles.mainContainerCardResumen}>
      <h2 className={styles.mainContainerCardTitle}>Resumen</h2>
      <h3 className={styles.mainContainerCardMonth}>Noviembre 2022</h3>
      <div className={styles.mainContainerCardEntryAndSpent}>
        <div className={styles.containerChartCardResumen}>
          <Doughnut
            data={data}
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
