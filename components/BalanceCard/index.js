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
import { useSelector } from "react-redux";
import { formatterPeso } from "../../utils/formatterPeso";
import { Ring } from "@uiball/loaders";
import Cookies from "js-cookie";

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
  const user = useSelector((state) => state.UserSlice);
  const [loader, setLoader] = useState(true);
  const date = new Date()

  const monthsName = [
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

  useEffect(() => {
    setLoader(true);
    async function lastTransactions() {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/transactions/lastTransaction`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      console.log(res)
      const lastDateTransaction = new Date(res.data.data[0]?.date)
      //la primera res.data.data[0] es igual a la ultima transaccion de ahi tomar el mes y la fecha
      //ir realizando las transacciones desde mi fecha y ir comparando si tengo 6 stop si es igual la fecha a la ultima stop
      //const date = new Date("2022/02/01")

      const months = [];
      const balanceMonths = [];
      if(lastDateTransaction.getMonth() !== date.getMonth() && lastDateTransaction.getFullYear() !== date.getFullYear()){
        console.log("no son iguales")
        for (let i = 0; i < res.data.data.length; i++) {
          const dateTransactions = new Date(res.data.data[i].date)
          months.unshift(`${monthsName[dateTransactions.getMonth()]} ${dateTransactions.getFullYear()}`);
          balanceMonths.unshift(res.data.data[i].balance);
        }
      }else{
        for (let i = 0; i < res.data.data.length; i++) {
          const dateTransactions = new Date(res.data.data[i].date)
          months.unshift(`${monthsName[dateTransactions.getMonth()]} ${dateTransactions.getFullYear()}`);
          balanceMonths.unshift(res.data.data[i].balance);
        }
      }
      setLastTransactions({
        ...lastTransactions,
        labels: months,
        datasets: [
          {
            ...lastTransactions.datasets,
            data: balanceMonths,
          },
        ],
      });
      setLoader(false);
    }
    if (Cookies.get("token")) {
      lastTransactions();
    }
  }, [user.transactionsIds]);

  return (
    <div className={styles.mainContainerBalanceCard}>
      <h2 className={styles.titleContainerBalanceCard}>Balance</h2>
      <div className={styles.containerAmountBalanceCard}>
        <p>Cantidad total que posee:</p>
        <p className={styles.pAmountBalanceCard}>
          {lastTransactions.labels.length > 0
            ? formatterPeso.format(
                lastTransactions.datasets[0].data[
                  lastTransactions.datasets[0].data.length - 1
                ]
              )
            : `$${0}`}
        </p>
      </div>
      <div className={styles.containerChartBalance}>
        {loader ? (
          <div className={styles.containerLoaderBalance}>
            <Ring size={35} color="#050505" />
          </div>
        ) : null}

        <Line options={options} data={lastTransactions} />
      </div>
    </div>
  );
}
export default BalanceCard;
