import styles from "./index.module.scss";
import ModalTransaccions from "./ModalTransaccions";

function CardTransaccions() {
  return (
    <div className={styles.mainContainerCardTransaccions}>
      <h2 className={styles.titleContainerCardTransaccions}>Transacciones</h2>
      <div className={styles.containerModalTransaccions}>
        <ModalTransaccions
          amount={40000}
          wallet={"Cartera"}
          category={"Salario"}
          date={"11/04/2022"}
          type={"Expense"}
          img={
            "https://res.cloudinary.com/dvdun5uli/image/upload/v1667524253/category%20default%20images/Spents/Bares_zl91th.png"
          }
        />
        <ModalTransaccions
          amount={40000}
          wallet={"Cartera"}
          category={"Salario"}
          date={"11/04/2022"}
          type={"Entry"}
          img={
            "https://res.cloudinary.com/dvdun5uli/image/upload/v1667524041/category%20default%20images/Spents/Tecnologia_dwfusu.png"
          }
        />
        <ModalTransaccions
          amount={40000}
          wallet={"Cartera"}
          category={"Salario"}
          date={"11/04/2022"}
          type={"Expense"}
          img={"https://res.cloudinary.com/dvdun5uli/image/upload/v1667524042/category%20default%20images/Spents/Transportes_jzkznl.png"}
        />
      </div>
    </div>
  );
}
export default CardTransaccions;
