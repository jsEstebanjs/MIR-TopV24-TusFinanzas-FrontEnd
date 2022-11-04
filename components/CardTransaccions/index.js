import styles from './index.module.scss';
import ModalTransaccions from './ModalTransaccions';

function CardTransaccions(){
    return(
        <div className={styles.mainContainerCardTransaccions}>
            <h2 className={styles.titleContainerCardTransaccions}>Transacciones</h2>
            <ModalTransaccions />
        </div>
    )
}
export default CardTransaccions;