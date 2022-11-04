import styles from './index.module.scss'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
  } from 'chart.js';
import { Line } from 'react-chartjs-2';
import {options , balanceData} from './constants';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
  );
function BalanceCard({amount}){
    return(
        <div className={styles.mainContainerBalanceCard}>
            <h2 className={styles.titleContainerBalanceCard}>Balance</h2>
            <div className={styles.containerAmountBalanceCard}>
                <p>Cantidad total que posee:</p>
                <p className={styles.pAmountBalanceCard}>${amount}</p>
            </div>
            <div className={styles.containerChartBalance}>
                <Line options={options} data={balanceData}/>
            </div>
        </div>
    )
}
export default BalanceCard;