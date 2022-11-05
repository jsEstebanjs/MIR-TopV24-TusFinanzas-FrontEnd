import styles from './index.module.scss';



function ChartOfAccounts({amount,latest}){
    return(
        <div className={styles.mainContainerChartOfAccounts}>
            <h2 className={styles.titleContainerChartOfAccounts}>Cuentas</h2>
            <div className={styles.containerChartAndAmount}>
                <p className={styles.pChart}>Cartera</p>
                <p className={styles.pAmountChart}>${amount}</p>
            </div>
            <p>Ultima vez usado: {latest}</p>
        </div>
    )
}
export default ChartOfAccounts;