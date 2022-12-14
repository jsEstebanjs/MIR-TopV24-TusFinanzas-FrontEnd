import styles from "./index.module.scss";
import { useSelector } from "react-redux";
import { formatterPeso } from "../../utils/formatterPeso";
import { Ring } from "@uiball/loaders";

function ChartOfAccounts({ loader }) {
  const transaccions = useSelector((state) => state.TransaccionsSlice.docs[0]);
  let date2 = false;
  if (transaccions instanceof Object) {
    date2 = new Date(transaccions.createdAt);
  }
  return (
    <div className={styles.mainContainerChartOfAccounts}>
      <h2 className={styles.titleContainerChartOfAccounts}>Cuenta</h2>
      {loader ? (
        <div className={styles.containerLoaderChartOfAccounts}>
          <Ring size={35} color="#050505" />
        </div>
      ) : (
        <>
          <div className={styles.containerChartAndAmount}>
            <p className={styles.pChart}>Cartera</p>
            <p className={styles.pAmountChart}>
              {date2 === false
                ? `$0`
                : formatterPeso.format(transaccions.balance)}
            </p>
          </div>
          <p>
            Ultima vez usado:
            {date2 === false
              ? " Ninguna"
              : ` ${date2.getDate()}/${
                  date2.getMonth() + 1
                }/${date2.getFullYear()}`}
          </p>
        </>
      )}
    </div>
  );
}
export default ChartOfAccounts;
