import styles from './index.module.scss';
import { Ring } from "@uiball/loaders";

function LoadingLanding() {
  return (
    <div className={styles.mainContainerLoadingLanding}>
      <Ring size={50} color="#050505" />
    </div>
  );
}
export default LoadingLanding;
