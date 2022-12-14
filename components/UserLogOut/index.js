import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import styles from "./index.module.scss";
import { useRouter } from "next/router";
import Link from "next/link";
import Cookies from "js-cookie";
import { ResetState } from "../../store/user.Slice";


function UserLogOut() {
  const route = useRouter();
  const user = useSelector((state) => state.UserSlice);
  const dispatch = useDispatch();
  const handleLogOut = () => {
    Cookies.remove("token");
    dispatch(ResetState());
    route.push("/login");
  };
  return (
    <div className={styles.mainContainerUserLogOut}>
      <Image
        src={user.picture}
        alt={user.name}
        width={40}
        height={40}
        priority={true}
      />
      <div className={styles.blockUserLogOut}>
        <div className={styles.containerUserLogOut}>
          <Link className={styles.infoContainerUserLogOut} href="/settings">
            Configuracion
          </Link>
          <p onClick={handleLogOut} className={styles.infoContainerUserLogOut}>
            Salir
          </p>
        </div>
      </div>
    </div>
  );
}
export default UserLogOut;
