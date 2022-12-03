import { useEffect, useState } from "react";
import CardResumenHome from "../components/CardResumenHome";
import ChartOfAccounts from "../components/ChartOfAccounts";
import BalanceCard from "../components/BalanceCard";
import CardTransaccions from "../components/CardTransaccions";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { pushDocs } from "../store/transaccions.Slice";
import Layout from "../components/Layout";
import styles from "../styles/pages/Home.module.scss";
import Cookies from "js-cookie";
import { ProtectRoute } from "../components/withAuth/index";

function Home() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.UserSlice);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    async function lastTransaccions() {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/transactions?limit=10&page=1`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );

      dispatch(pushDocs(res.data.data.docs));
    }
    if (Cookies.get("token")) {
      lastTransaccions();
    }
    setLoader(false);
  }, [user.transactionsIds]);

  return (
    <Layout title="Vista General">
      <main className={styles.mainContainerVisionGeneralTwo}>
        <CardResumenHome />
        <ChartOfAccounts />
        <BalanceCard />
        <CardTransaccions loader={loader} />
      </main>
    </Layout>
  );
}
export default ProtectRoute(Home);

export async function getStaticProps(context) {
  return {
    props: {
      private: true,
    },
  };
}
