import Image from "next/image";
import styles from "./index.module.scss";

function ChangePictureUser({ src, alt }) {
  return (
    <>
      <div className={styles.opacity}></div>
      <div className={styles.mainContainerChangePictureUser}>
        <div className={styles.containerIMG}>
          <Image src={src} alt={alt} width={100} height={100} />
        </div>
        <p>PRIUEAQDQDWDWD</p>
      </div>
    </>
  );
}
export default ChangePictureUser;
