import styles from "./index.module.scss";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { donutDataDefault } from "./constants";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { formatterPeso } from "../../utils/formatterPeso";
import { mouths } from "./constants";
import { Ring } from "@uiball/loaders";

ChartJS.register(ArcElement, Tooltip, Legend);

function CardResumenHome({ loader }) {
  const lastTransaction = useSelector(
    (state) => state.TransaccionsSlice.docs[0]
  );
  const [lastTransactionLocal, setLastTransactionLocal] =
    useState(lastTransaction);
  const [donutData, setDonutData] = useState(donutDataDefault);
  const date = new Date();

  useEffect(() => {
    setLastTransactionLocal(lastTransaction);
    if (lastTransaction) {
      const lastDate = new Date(lastTransaction.createdAt);
      if (date.getMonth() !== lastDate.getMonth() ||date.getFullYear() !== lastDate.getFullYear()) {
        setLastTransactionLocal({
          balance: 0,
          createdAt: date,
          todoEntry: lastTransaction.balance,
          todoExpense: 0,
        });
        setDonutData({
          ...donutDataDefault,
          datasets: [
            {
              ...donutDataDefault.datasets[0],
              data: [
                lastTransaction.balance,
                0,
                lastTransaction.balance === 0 ? 100 : 0,
              ],
            },
          ],
        });
      } else {
        setDonutData({
          ...donutDataDefault,
          datasets: [
            {
              ...donutDataDefault.datasets[0],
              data: [
                lastTransaction?.todoEntry,
                lastTransaction?.todoExpense,
                0,
              ],
            },
          ],
        });
      }
    } else {
      setDonutData(donutDataDefault);
    }
  }, [lastTransaction]);

  const transactionDate = lastTransactionLocal?.createdAt
    ? new Date(lastTransactionLocal.createdAt)
    : null;
  return (
    <div className={styles.mainContainerCardResumen}>
      <h2 className={styles.mainContainerCardTitle}>Resumen mensual</h2>
      <h3 className={styles.mainContainerCardMonth}>
        {!transactionDate
          ? `${
            mouths[date.getMonth()]
          } ${date.getFullYear()}`
          : `${
              mouths[transactionDate.getMonth()]
            } ${transactionDate.getFullYear()}`}
      </h3>
      <div className={styles.mainContainerCardEntryAndSpent}>
        {loader ? (
          <div className={styles.containerLoaderResume}>
            <Ring size={35} color="#050505" />
          </div>
        ) : (
          <>
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
                  {!transactionDate
                    ? "$0.00"
                    : formatterPeso.format(lastTransactionLocal.todoEntry)}
                </p>
                <p className={styles.pInfoCardSpent}>
                  {!transactionDate
                    ? "$0.00"
                    : formatterPeso.format(lastTransactionLocal.todoExpense)}
                </p>
                <p className={styles.pInfoResult}>
                  {!transactionDate
                    ? "$0.00"
                    : formatterPeso.format(lastTransactionLocal.balance)}
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
export default CardResumenHome;
