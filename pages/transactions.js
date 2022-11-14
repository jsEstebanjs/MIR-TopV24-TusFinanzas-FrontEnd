import Layout from "../components/Layout";
import styles from "../styles/pages/Transactions.module.scss";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import ModalTransaccions from "../components/CardTransaccions/ModalTransaccions";
import { useState, useEffect } from "react";
import axios from "axios";
import { Ring } from "@uiball/loaders";
import { useSelector } from "react-redux";

function Transactions() {
  const date = new Date();
  const user = useSelector((state) => state.UserSlice);
  const [loading,setLoading] = useState(false)
  const [dateObj, setDateObj] = useState({
    year: date.getFullYear(),
    month: date.getMonth(),
  });
  const [transactions,setTransactions] = useState([])
  const Months = [
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
    async function lastTransaccions() {
      setLoading(true)
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/transactions/transactionsMonth?month=${dateObj.month}&year=${dateObj.year}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setTransactions(res.data.data.reverse())
      setLoading(false)
    }
    if (localStorage.getItem("token")) {
      lastTransaccions();
    }
  }, [dateObj,user.transactionsIds]);
  const anotherMonth = (type)=>{
    if(type === "left"){
      if(dateObj.month === 0){
        setDateObj({...dateObj,month:11,year:dateObj.year - 1})
      }else{
        setDateObj({...dateObj,month:dateObj.month - 1})
      }

    }else{
      if(dateObj.month === 11){
        setDateObj({...dateObj,month:0,year:dateObj.year + 1})
      }else{
        setDateObj({...dateObj,month:dateObj.month + 1})
      }

    }
  }
  return (
    <Layout title="Transacciones">
      <main className={styles.mainContainerTransactions}>
        <div className={styles.containerNavMonthsAndYears}>
          <span onClick={()=> anotherMonth("left")}>
            <MdKeyboardArrowLeft />
          </span>
          <p className={styles.infoMonthAndYear}>
            {Months[dateObj.month]} {dateObj.year}
          </p>
          <span onClick={()=> anotherMonth("right")}>
            <MdKeyboardArrowRight />
          </span>
        </div>
        <div className={styles.containerTransactions}>
          {transactions.length
          >=
          1
          ?
          transactions.map((item)=>(
            <ModalTransaccions
            key={item._id}
            amount={item.amount}
            date={item.createdAt}
            category={item.nameCategory}
            wallet={"Cartera"}
            type={item.type}
            img={item.favicon}
            />
          ))
          :
          loading
          ?
          <Ring size={50} color="#050505" />
          :
          <p>No hay Transacciones en este mes</p>
        }
        </div>
      </main>
    </Layout>
  );
}
export default Transactions;

export async function getStaticProps(context) {
  return {
    props: {
      private: true,
    },
  };
}
