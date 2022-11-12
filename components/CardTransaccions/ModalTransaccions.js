import styles from "./ModalTransaccions.module.scss";
import Image from "next/image";

function ModalTransaccions({ amount, date, category, wallet, type , img }) {
  const date2 = new Date(date)
  return (
    <div
      className={`${styles.mainContainerModalTransaccions} ${
        type === "Entry"
          ? styles.mainContainerInfoModalTransaccionsBorderGreen
          : styles.mainContainerInfoModalTransaccionsBorderRed
      }`}
    >
      <Image
        height={50}
        width={50}
        src={img}
        alt={category}
      />
      <div className={`${styles.containerInfoModalTransaccions}`}>
        <div>
          <p>{category}</p>
          <p className={styles.infoPWallet}>{wallet}</p>
        </div>
        <div>
          <p className={styles.infoPAmount}>
            ${type === "Expense" ? "-" : null}
            {amount}
          </p>
          <p>{`${date2.getDate()}/${date2.getMonth() + 1}/${date2.getFullYear()}`}</p>
        </div>
      </div>
    </div>
  );
}
export default ModalTransaccions;
