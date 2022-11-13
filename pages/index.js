import { useEffect } from "react";
import CardResumenHome from "../components/CardResumenHome";
import ChartOfAccounts from "../components/ChartOfAccounts";
import BalanceCard from "../components/BalanceCard";
import CardTransaccions from "../components/CardTransaccions";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { pushDocs } from "../store/transaccions.Slice";
import Layout from "../components/Layout";

export default function Home() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.UserSlice);

  useEffect(() => {
    async function lastTransaccions() {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/transactions?limit=10&page=1`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      dispatch(pushDocs(res.data.data.docs));
    }
    if (localStorage.getItem("token")) {
      lastTransaccions();
    }
  }, [user.transactionsIds]);

  return (
    <Layout title="Vista General">
      <CardResumenHome />
      <ChartOfAccounts />
      <BalanceCard />
      <CardTransaccions />
    </Layout>
  );
}

export async function getStaticProps(context) {
  return {
    props: {
      private: true,
    },
  };
}
