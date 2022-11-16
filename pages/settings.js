import Layout from "../components/Layout";
import styles from "../styles/pages/Settings.module.scss";
import Image from "next/image";
import { useSelector } from "react-redux";
import UpdateUserInputs from "../components/UpdateUserInputs";
import { MdCameraAlt } from "react-icons/md";
import { useState } from "react";
import ChangePictureUser from '../components/ChangePictureUser';

function Settings() {
  const user = useSelector((state) => state.UserSlice);
  const [visibleChangePicture, setVisibleChangePicture] = useState(false);
  return (
    <Layout title="Configuracion">
      <main className={styles.mainContainerSettings}>
        <ChangePictureUser src={user.picture} alt={user.name}/>
        <div className={styles.containerSettings}>
          <div className={styles.containerImgSettings}>
            <Image
              src={user.picture}
              width={80}
              height={80}
              alt={user.name}
              objectFit="cover"
            />
            <div onClick={()=> setVisibleChangePicture(true)} className={styles.hoverImge}>
              <MdCameraAlt />
              <p>Editar</p>
            </div>
          </div>
          <div className={styles.containerUpdateUserInputs}>
            <UpdateUserInputs
              errorMessage="El nombre no es valido"
              type={"text"}
              label="Nombre"
              value={user.name}
              length={3}
              exp={/^([A-ZÑÁÉÍÓÚÜ]||[a-zñáéíóú]+[\s]*)+$/}
            />
            <UpdateUserInputs
              errorMessage="El email no es valido"
              type={"email"}
              label="Email"
              value={user.email}
              length={4}
              exp={/\S+@\S+\.\S+/}
            />
          </div>
        </div>
      </main>
    </Layout>
  );
}
export default Settings;

export async function getStaticProps(context) {
  return {
    props: {
      private: true,
    },
  };
}
