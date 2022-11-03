import styles from './index.module.scss';

function CardResumenHome(){
    return(
        <div className={styles.mainContainerCardResumen}>
            <h2 className={styles.mainContainerCardTitle}>Resumen</h2>
            <h3 className={styles.mainContainerCardMonth}>Noviembre 2022</h3>
            <div></div>
        </div>

    )
}
export default CardResumenHome;