import Image from "next/image";
import styles from "./index.module.scss";
import { useState } from "react";
import { MdImage, MdSave } from "react-icons/md";
import { updateUser } from "../../utils/updateUser";
import axios from "axios";
import { Ring } from "@uiball/loaders";
import { updatePicture } from "../../store/user.Slice";
import { useDispatch } from "react-redux";

function ChangePictureUser({ src, alt, isVisible, funcIsVisible }) {
  const [image, setImage] = useState(null);
  const [objImg, setObjImg] = useState(null);
  const [loaderFetch, setLoaderFetch] = useState(false);
  const dispatch = useDispatch();
  const handleSubmit = async (img) => {
    const data = new FormData();
    for (let i = 0; i < img.length; i++) {
      data.append(`file_${i}`, img[i], img[i].name);
    }

    const res = await axios.post(process.env.NEXT_PUBLIC_API_URL, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res;
  };

  const readFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => setImage(e.target.result);
    reader.readAsDataURL(file);
  };

  const handleChange = (event) => {
    readFile(event.target.files[0]);
    setObjImg(event.target.files);
  };
  const updateUserFetch = async (reset) => {
    if (reset) {
      setLoaderFetch(true);
      const res = await updateUser({}, true);
      dispatch(updatePicture(res.data.data.picture));
      setObjImg(null)
      setImage(null)
      setLoaderFetch(false);
      funcIsVisible();
    } else if (objImg !== null) {
      setLoaderFetch(true);
      const res = await handleSubmit(objImg);
      const update = await updateUser({ picture: res.data.file_0 });
      dispatch(updatePicture(update.data.data.picture));
      setObjImg(null)
      setImage(null)
      setLoaderFetch(false);
      funcIsVisible();
    }
  };

  return (
    <>
      <div
        onClick={funcIsVisible}
        className={`${styles.opacity} ${
          isVisible ? styles.opacityVisible : null
        }`}
      ></div>
      <div
        className={`${styles.mainContainerChangePictureUser} ${
          isVisible ? styles.mainContainerChangePictureUserVisible : null
        }`}
      >
        <div className={styles.containerIMG}>
          <Image
            src={image ? image : src}
            alt={alt}
            width={150}
            height={150}
            priority={true}
          />
          {loaderFetch ? (
            <div className={styles.containerLoader}>
              <Ring size={35} color="#050505" />
            </div>
          ) : null}
        </div>
        <button
          onClick={() => updateUserFetch(true)}
          className={styles.btnDeletePicture}
          type="button"
        >
          Eliminar Foto
        </button>
        <input
          id="pictureUser"
          type="file"
          accept=".png, .jpg, .jpeg"
          onChange={handleChange}
          className={styles.inputDisable}
        ></input>
        <label htmlFor="pictureUser" className={styles.labelInputDisable}>
          <MdImage /> Elegir imagen
        </label>
        <div className={styles.containerBts}>
          <button
            onClick={() => updateUserFetch(false)}
            className={styles.btnSave}
          >
            <MdSave />
            Guardar
          </button>
          <button
            onClick={funcIsVisible}
            className={`${styles.btnSave} ${styles.btnCancel}`}
          >
            Cancelar
          </button>
        </div>
      </div>
    </>
  );
}
export default ChangePictureUser;
