import React, { useState } from 'react'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { auth, storage,db } from "../firebase"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {doc ,setDoc} from "firebase/firestore"
import { useNavigate } from 'react-router-dom';

const Register = () => {

  const navigate = useNavigate()

  const [errPosition, setErrPosition] = useState("top-right");
  const notError = () => toast.error("Kayıt başarısız");

  const handleSubmit = async (e) => {
    e.preventDefault()
    const displayName = e.target[0].value
    const email = e.target[1].value
    const password = e.target[2].value
    const file = e.target[3].files[0]

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password)

      const storageRef = ref(storage, displayName);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        (error) => {
          setErrPosition("bottom-center")
          notError()
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then( async(downloadURL) => {
            await updateProfile(res.user,{
              displayName,
              photoURL: downloadURL
            })
            await setDoc(doc(db, "users", res.user.uid),{
              uid: res.user.uid,
              displayName,
              email,
              photoURL : downloadURL
            })

            await setDoc(doc(db,"userChats",res.user.uid), {})
            navigate("./")
          });
        }
      );

    } catch (err) {
      setErrPosition("top-right")
      notError()
    }
  }

  return (
    <div className='formContainer'>
      <div className="formWrapper">
        <span className="logo">30lukteam chat</span>
        <span className="title">Kayıt ol</span>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder='ad soyad' />
          <input type="email" placeholder='email' />
          <input type="password" placeholder='şifre' />
          <input type="file" />
          <button>Kayıt ol</button>
        </form>
        <p>hesabınız var mı giriş yapın</p>
      </div>
      <ToastContainer
        position={errPosition}
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  )
}

export default Register
