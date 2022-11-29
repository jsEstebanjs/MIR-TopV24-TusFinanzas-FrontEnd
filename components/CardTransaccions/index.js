import styles from "./index.module.scss";
import ModalTransaccions from "./ModalTransaccions";
import { useSelector } from "react-redux";
import { Ring } from "@uiball/loaders";

function CardTransaccions({ loader }) {
  const transaccions = useSelector((state) => state.TransaccionsSlice.docs);

  return (
    <div className={styles.mainContainerCardTransaccions}>
      <h2 className={styles.titleContainerCardTransaccions}>Transacciones</h2>
      <div className={styles.containerModalTransaccions}>
        {loader ? (
          <div className={styles.containerLoaderTransaccions}>
            <Ring size={35} color="#050505" />
          </div>
        ) : null}
        {transaccions.length !== 0 ? (
          <>
            {transaccions.map((item) => (
              <ModalTransaccions
                key={item._id}
                amount={item.amount}
                wallet={"Cartera"}
                category={item.nameCategory}
                date={item.createdAt}
                type={item.type}
                img={item.favicon}
              />
            ))}
          </>
        ) : (
          <p>Sin Transacciones</p>
        )}
      </div>
    </div>
  );
}
export default CardTransaccions;
