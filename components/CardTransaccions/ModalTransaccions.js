import styles from './ModalTransaccions.module.scss';
import Image from 'next/image';

function ModalTransaccions({amount,date,category,wallet}){
    return(
        <div>
            <Image
            height={100}
            />
            <div >
                <div>
                    <p>{category}</p>
                    <p>{wallet}</p>
                </div>
                <div>
                    <p>{amount}</p>
                    <p>{date}</p>
                </div>
            </div>
        </div>
    )
}
export default ModalTransaccions;