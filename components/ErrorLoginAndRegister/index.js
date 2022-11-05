import Image from "next/image";
import styles from './index.module.scss'
import cancelar from './cancelar.png'
function ErrorLoginAndRegister({errorMessage,active,handle}){
    if(active){
        setTimeout(()=>{
            handle("")
        },5000)
    }


    return(
        <div className={`${styles.mainContainerErrorLoginAndRegister} ${active ? styles.mainContainerErrorTop : null}`}>
            <div className={styles.opacity}></div>
            <Image 
            width={50}
            height={50}
            src={cancelar}
            />
            <p className={styles.errorMessage}>{errorMessage}</p>
        </div>
    )
}
export default ErrorLoginAndRegister;