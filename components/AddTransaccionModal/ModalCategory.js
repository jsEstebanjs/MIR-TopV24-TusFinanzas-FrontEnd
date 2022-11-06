import styles from './ModalCategory.module.scss';
import Image from 'next/image';
import { MdKeyboardArrowDown } from "react-icons/md";
import imgPlaceHolder from './imagen.png'

function ModalCategory({src,name,id}){
    return(
        <div className={styles.mainContainerModalCategory}>
            <div className={styles.containerModalCategory}>
            <Image 
            width={50}
            height={50}
            alt={name}
            src={imgPlaceHolder}
            />
            <h1 className={styles.titleModalCategory}>{name}Finanzas</h1>
            </div>
            <MdKeyboardArrowDown />

        </div>
    )
}
export default ModalCategory;