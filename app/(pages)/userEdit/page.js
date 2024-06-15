"use client"
import { useState } from 'react';
import styles from "@/app/styles/userEdit.module.css";
import Image from 'next/image'
import EyeOpen from '@/app/assets/images/EyeOpen.png'
import EyeClose from '@/app/assets/images/EyeClose.png'
import titleImage from '@/app/assets/images/title.png';
import useClient from '@/app/hooks/useClient';

export default function UserEdit() {
  const { client, fetchClient, loading, error, contextHolder, updateClient, deleteClient} = useClient();
  fetchClient(1)
  const [ id, setId] = useState(1);
  const [ name, setName] = useState();
  const [ email, setEmail] = useState();
  const [ password, setPassword] = useState();

  const saveClient =()=> {
    const client = {
      id: 1,
      name: name,
      email: email,
      password: password
    }
    updateClient(client)
  }
  const excluirClient =()=> {
    deleteClient(6)
  }
  const updateName =(e)=> {
    setName(e.target.value)
  }
  const updateEmail =(e)=> {
    setEmail(e.target.value)
  }
  const updatePassword =(e)=> {
    setPassword(e.target.value)
  }

  const [isShow, setIsShow] = useState(false);
  const [isShowTwo, setIsShowTwo] = useState(false);
  const handlePassword =()=>setIsShow(!isShow);
  const handlePasswordTwo =()=>setIsShowTwo(!isShowTwo);

  return (
    <main className={styles.main}>
      <div className={styles.welcome}>
        <div className={styles.logoImage}>
          <Image
            src={titleImage}
            width={300}
            alt="Title photo"
          />
        </div>
        <div className={styles.title}>
          <span>Editar perfil</span>
        </div>
        <div className={styles.containerBody}>
          <div className={styles.container}>
            <div className={styles.span}>
              <span>Alterar foto de perfil</span>
            </div>
            <div className={styles.containerInputName}>
              <div className={styles.inputName}>
                <label for="nome">Nome:</label>
                <input type="text" id="nome" name="nome" className={styles.inputText} onChange={(e) => updateName(e)} defaultValue={client[0]?client[0].name:''}></input>
              </div>
              <div className={styles.inputSurname}>
                <label for="surname">Sobrenome:</label>
                <input type="text" id="surname" name="surname" className={styles.inputText}></input>
              </div>
            </div>
            <div className={styles.containerInputText}>
              <div className={styles.inputs}>
                <div className={styles.inputsEmail}>
                  <label for="email">Atualizar email:</label>
                  <input type="text" id="email" name="email" className={styles.inputEmailTel} onChange={(e) => updateEmail(e)} defaultValue={client[0]?client[0].email:''}></input>
                </div>
                <div className={styles.inputsCellphone}>
                  <label for="cellphone">Atualizar telefone:</label>
                  <input type="text" id="cellphone" name="cellphone" className={styles.inputEmailTel}></input>
                </div>
              </div>
              <div className={styles.containerPasswords}>
                <label for="password" className={styles.labelPass}>Nova senha:</label>
                <div className={styles.password}>
                  <input type={isShow ? "text" : "password"} id="password" name="password" onChange={(e) => updatePassword(e)} className={styles.inputPasswords}></input>
                  <button onClick={handlePassword} type="button">
                    {isShow && <Image src={EyeClose} width={40} alt="eye photo open two" />}
                    {!isShow && <Image src={EyeOpen} width={40} alt="eye photo open two" />}
                  </button>
                </div>
                <label for="confirmPassword" className={styles.labelPass}>Confirmar Senha:</label>
                <div className={styles.confirmPassword}>
                  <input type={isShowTwo ? "text" : "password"} id="confirmPassword" name="confirmPassword" className={styles.inputPasswords}></input>
                  <button onClick={handlePasswordTwo} type="button">
                    {isShowTwo && <Image src={EyeClose} width={40} alt="eye photo open two" />}
                    {!isShowTwo && <Image src={EyeOpen} width={40} alt="eye photo open two" />}
                  </button>
                </div>
              </div>
            </div>
            <div className={styles.containerFeet}>
              <div className={styles.button}>
                <button className={styles.buttonCadastrar} onClick={()=> saveClient()}>Atualizar</button>
                <button className={styles.buttonExcluir} onClick={()=> excluirClient()}>Excluir</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
