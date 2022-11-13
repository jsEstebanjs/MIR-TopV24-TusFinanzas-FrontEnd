import Image from "next/image"
import { useSelector } from "react-redux";
import styles from './index.module.scss';
import { useRouter } from "next/router";

function UserLogOut(){
    const route = useRouter()
    const user = useSelector((state)=> state.UserSlice)
    const handleLogOut = ()=>{
        localStorage.removeItem("token");
        route.push("/login")
    }
    return(
        <div className={styles.mainContainerUserLogOut}>
            <Image 
            src={user.picture}
            alt={user.name}
            width={20}
            height={20}
            />
            <div className={styles.blockUserLogOut}>
            <div className={styles.containerUserLogOut}>
                <p onClick={handleLogOut} className={styles.infoContainerUserLogOut}>Log Out</p>
            </div>
            </div>
        </div>

    )
}
export default UserLogOut;