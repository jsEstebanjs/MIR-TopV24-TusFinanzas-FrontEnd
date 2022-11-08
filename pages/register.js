import FormAuth from "../components/FormAuth";
import styles from '../styles/pages/Register.module.scss'
import Link from "next/link";
function Register(){
    return(
        <div className={styles.mainContainerRegister}>
            <div className={styles.containerRegisterNav}>
                <h1 className={styles.titleContainerRegisterNav}>Bienvenido a Tus Finanzas</h1>
                <div className={styles.containerBtnNav}>
                    <Link className={styles.linkNav} href='/register'>Registrarse</Link>
                    <Link className={styles.linkNav} href='/login' >Iniciar Sesion</Link>
                </div>
            </div>
            <div className={styles.mainFormContainer}>
                <FormAuth 
                btn="Registrarse"
                isName={true}
                url="register"
                />
            </div>

        </div>
    )
}
export default Register;