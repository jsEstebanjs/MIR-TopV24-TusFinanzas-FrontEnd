import { useEffect, useState } from "react";
import { validateToken } from "../../utils/valideToken";
import { useRouter } from "next/router";
import LoadingLanding from "../LoadingLading/index";
import { useDispatch } from "react-redux";
import { setInitialState } from "../../store/user.Slice";

function VerifyToken() {
  const router = useRouter();
  const [loading, setLoader] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetch() {
      setLoader(true);
      if (
        (router.pathname === "/login" && !localStorage.getItem("token")) ||
        (router.pathname === "/register" && !localStorage.getItem("token"))
      ) {
        setLoader(false);
        return;
      }
      if (localStorage.getItem("token")) {
        const res = await validateToken();
        if (res === false) {
          localStorage.removeItem("token");
          await router.push("/login");
          setLoader(false);
          return;
        } else {
          dispatch(setInitialState(res.data.data));
        }
        if (router.pathname === "/login" || router.pathname === "/register") {
          await router.push("/");
          setLoader(false);
          return;
        }
      } else {
        await router.push("/login");
        setLoader(false);
        return;
      }
      setLoader(false);
    }
    fetch();
  }, []);
  return <>{loading ? <LoadingLanding /> : null}</>;
}

export default VerifyToken;
