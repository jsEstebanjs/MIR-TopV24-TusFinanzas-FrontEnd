import styles from "./index.module.scss";
import Image from "next/image";

function LoadingLanding() {
  return (
    <div className={styles.mainContainerLoadingLanding}>
      <Image
        src="https://res.cloudinary.com/dvdun5uli/image/upload/v1668452971/category%20default%20images/IconWEB/icon_vqhly8.png"
        alt="Logo"
        width={100}
        height={100}
        priority={true}
      />
    </div>
  );
}
export default LoadingLanding;
