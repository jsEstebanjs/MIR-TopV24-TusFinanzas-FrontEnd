import FormAuth from "../components/FormAuth";
import styles from '../styles/pages/Register.module.scss'
import Link from "next/link";
function Login(){
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
                btn="Iniciar Sesion"
                isName={false}
                url="http://localhost:8080/users/login"
                />
            </div>

        </div>
    )
}
export default Login;