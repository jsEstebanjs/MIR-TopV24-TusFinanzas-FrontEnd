import styles from './index.module.scss'

function ModalChangePassword(){
    return(
        <>
        <div className={styles.opacity}></div>
        <div className={styles.mainContainerModalChangePassword}>
            <h2>Cambiar Contraseña</h2>
            <label htmlFor='oldPassword'>Contraseña actual</label>
            <input  type='password' id='oldPassword'/>

            <label htmlFor='newPassword'>Nueva contraseña</label>
            <input  type='password' id='newPassword'/>
        </div>
        </>
    )
}
export default ModalChangePassword;