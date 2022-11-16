import "../styles/base/globals.css";
import Head from "next/head";
import { store } from "../store/store";
import { Provider } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useState } from "react";
import LoadingLanding from "../components/LoadingLading";
import { validateToken } from "../utils/valideToken";
import userSlice, { setInitialState } from "../store/user.Slice";


function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [loading, setLoader] = useState(true);
  
  useEffect(() => {
    async function auth() {
      if (!localStorage.getItem("token")) {
        await router.push("/login");
        setLoader(false);
      } else {
        const res = await validateToken();
        if (!res) {
          localStorage.removeItem("token");
          await router.push("/login");
        } else {
          store.dispatch(setInitialState(res.data.data))
        }
        setLoader(false);
      }
      console.log("entro useEffect")
    }

    if(pageProps?.private) auth();
    else setLoader(false);
  }, []);

  return (
    <>
      <Head>
        <title>Tus Finanzas</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="https://res.cloudinary.com/dvdun5uli/image/upload/v1668452971/category%20default%20images/IconWEB/icon_vqhly8.png" />
      </Head>
      <Provider store={store}>
        {loading ? <LoadingLanding /> : <Component {...pageProps} />}
      </Provider>
    </>
  );
}

export default MyApp;
