import Layout from "../components/Layout";
import styles from "../styles/pages/Settings.module.scss";
import Image from "next/image";
import { useSelector } from "react-redux";
import UpdateUserInputs from "../components/UpdateUserInputs";
import { MdCameraAlt } from "react-icons/md";
import { useState } from "react";
import ChangePictureUser from "../components/ChangePictureUser";
import ModalChangePassword from "../components/ModalChangePassword";

function Settings() {
  const user = useSelector((state) => state.UserSlice);
  const [visibleChangePicture, setVisibleChangePicture] = useState(false);
  const [visibleChangePassword,setVisibleChangePassword]=useState(false)

  const pictureVisible = () => {
    setVisibleChangePicture(!visibleChangePicture);
  };

  return (
    <Layout title="Configuracion">
      <main className={styles.mainContainerSettings}>
        <ChangePictureUser
          src={user.picture}
          alt={user.name}
          isVisible={visibleChangePicture}
          funcIsVisible={pictureVisible}
        />
        <ModalChangePassword />
        <div className={styles.containerSettings}>
          <div className={styles.containerImgSettings}>
            <Image
              src={user.picture}
              width={100}
              height={100}
              alt={user.name}
            />
            <div onClick={pictureVisible} className={styles.hoverImge}>
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
              objKey={"name"}
            />
            <UpdateUserInputs
              errorMessage="El email no es valido"
              type={"email"}
              label="Email"
              value={user.email}
              length={4}
              exp={/\S+@\S+\.\S+/}
              objKey={"email"}
            />
            <div className={styles.containerChangePassword}>
              <p>
                Contraseña
              </p>
              <p className={styles.pChangePassword}>
                Cambiar contraseña
              </p>
            </div>
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
