import styles from "./index.module.scss";
import { useSelector } from "react-redux";
import { formatterPeso } from "../../utils/formatterPeso";

function ChartOfAccounts() {
  const transaccions = useSelector((state) => state.TransaccionsSlice.docs[0]);
  let date2 = false;
  if (transaccions instanceof Object) {
    date2 = new Date(transaccions.createdAt);
  }
  return (
    <div className={styles.mainContainerChartOfAccounts}>
      <h2 className={styles.titleContainerChartOfAccounts}>Cuentas</h2>
      <div className={styles.containerChartAndAmount}>
        <p className={styles.pChart}>Cartera</p>
        <p className={styles.pAmountChart}>
          {date2 === false ? `$0` : formatterPeso.format(transaccions.balance)}
        </p>
      </div>
      <p>
        Ultima vez usado:
        {date2 === false
          ? " Ninguno"
          : ` ${date2.getDate()}/${
              date2.getMonth() + 1
            }/${date2.getFullYear()}`}
      </p>
    </div>
  );
}
export default ChartOfAccounts;
