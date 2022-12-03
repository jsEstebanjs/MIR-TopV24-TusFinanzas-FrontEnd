import { useRouter } from "next/router";
import { useEffect } from "react";
import { store } from "../../store/store";

export function ProtectRoute(Component) {
  return () => {
    const router = useRouter();
    useEffect(() => {
      if (!store.getState().UserSlice.name) {
        if (router.pathname !== "/login" || router.pathname !== "/register") {
          router.push("/login");
        }
      }
    }, [store.getState().UserSlice.name]);
    return <Component {...arguments} />;
  };
}
