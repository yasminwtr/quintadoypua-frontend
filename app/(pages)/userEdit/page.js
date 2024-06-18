"use client"
import { useState, useEffect } from 'react';
import styles from "@/app/styles/userEdit.module.css";
import Image from 'next/image'
import EyeOpen from '@/app/assets/images/EyeOpen.png'
import EyeClose from '@/app/assets/images/EyeClose.png'
import useClient from '@/app/hooks/useClient';
import Navbar from '@/app/components/Navbar/Navbar';
import Sidebar from '@/app/components/Sidebar/Sidebar';
import { Spin } from 'antd';

export default function UserEdit() {
  const { loading, updateClient, deleteClient, user, getUser } = useClient();
  const [isShow, setIsShow] = useState(false);
  const [isShowTwo, setIsShowTwo] = useState(false);
  const handlePassword = () => setIsShow(!isShow);
  const handlePasswordTwo = () => setIsShowTwo(!isShowTwo);
  const [id, setId] = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const role = localStorage.getItem('role');

  useEffect(() => {
    getUser()

  }, []);

  useEffect(() => {
    if (user) {
      setName(user.name)
      setEmail(user.email)
      setId(user.id)
    }

  }, [user]);

  const saveClient = () => {
    const client = {
      id: id,
      name: name,
      email: email,
      password: password
    }
    updateClient(client)
  }
  const excluirClient = () => {
    deleteClient(id)
  }

  const updateName = (e) => {
    setName(e.target.value)
  }

  const updateEmail = (e) => {
    setEmail(e.target.value)
  }

  const updatePassword = (e) => {
    setPassword(e.target.value)
  }

  const renderNav = () => {
    if (role === 'client') {
      return <Navbar />

    } else if (role === 'employee') {
      return <Sidebar />

    } else {
      return <></>
    }
  };

  return (
    <main className={role === 'client' ? styles.main : "main-internal"}>
      {renderNav()}

      {loading ?
        <Spin fullscreen={true} />
        :
        <>
          <div className={role === 'employee' ? styles.welcome : ""}>
            <div className={styles.containerBody}>
              <div className={styles.container}>
                <div className={styles.span}>
                  <span>Minha conta</span>
                </div>
                <div className={styles.containerInputName}>
                  <div className={styles.inputName}>
                    <label>Nome:</label>
                    <input type="text" id="nome" name="nome" className={styles.inputText} onChange={(e) => updateName(e)} value={name}></input>
                  </div>
                </div>
                <div className={styles.containerInputText}>
                  <div className={styles.inputs}>
                    <div className={styles.inputsEmail}>
                      <label >Atualizar email:</label>
                      <input type="text" id="email" name="email" className={styles.inputEmailTel} onChange={(e) => updateEmail(e)} value={email}></input>
                    </div>
                  </div>
                  <div className={styles.containerPasswords}>
                    <label className={styles.labelPass}>Nova senha:</label>
                    <div className={styles.password}>
                      <input type={isShow ? "text" : "password"} id="password" name="password" onChange={(e) => updatePassword(e)} className={styles.inputPasswords}></input>
                      <button onClick={handlePassword} type="button" className={styles.eye_button}>
                        {isShow && <Image src={EyeClose} width={30} alt="eye photo open two" />}
                        {!isShow && <Image src={EyeOpen} width={30} alt="eye photo open two" />}
                      </button>
                    </div>
                    <label className={styles.labelPass}>Confirmar Senha:</label>
                    <div className={styles.confirmPassword}>
                      <input type={isShowTwo ? "text" : "password"} id="confirmPassword" name="confirmPassword" className={styles.inputPasswords}></input>
                      <button onClick={handlePasswordTwo} type="button" className={styles.eye_button}>
                        {isShowTwo && <Image src={EyeClose} width={30} alt="eye photo open two" />}
                        {!isShowTwo && <Image src={EyeOpen} width={30} alt="eye photo open two" />}
                      </button>
                    </div>
                  </div>
                </div>
                <div className={styles.containerFeet}>
                  <div className={styles.button}>
                    <button className={styles.buttonCadastrar} onClick={() => saveClient()}>Atualizar</button>
                    <button className={styles.buttonExcluir} onClick={() => excluirClient()}>Excluir</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      }
    </main>
  );
}
