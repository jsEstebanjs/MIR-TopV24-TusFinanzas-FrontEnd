import styles from "./index.module.scss";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { options, balanceData } from "./constants";
import { useEffect, useState } from "react";
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);
function BalanceCard() {
  const [lastTransactions, setLastTransactions] = useState(balanceData);
  useEffect(() => {
    async function lastTransactions() {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/transactions/lastTransaction`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const months = []
      const balanceMonths = []
      for(let i = 0 ; i < res.data.data.length;i++){ 
        months.unshift(res.data.data[i].month)
        balanceMonths.unshift(res.data.data[i].balance)
      }
      setLastTransactions({
        ...lastTransactions,
        labels:months,
        datasets:[
          {
            ...lastTransactions.datasets,
            data:balanceMonths
          }
        ]
      })
    }
    if(localStorage.getItem("token")){
      lastTransactions();
    }
  }, []);

  return (
    <div className={styles.mainContainerBalanceCard}>
      <h2 className={styles.titleContainerBalanceCard}>Balance</h2>
      <div className={styles.containerAmountBalanceCard}>
        <p>Cantidad total que posee:</p>
        <p className={styles.pAmountBalanceCard}>
          ${lastTransactions.labels.length > 0 ? lastTransactions.datasets[0].data[0] : 0}
        </p>
      </div>
      <div className={styles.containerChartBalance}>
        <Line options={options} data={lastTransactions} />
      </div>
    </div>
  );
}
export default BalanceCard;
