"use client"
import { useState } from 'react';
import styles from "@/app/styles/sign.module.css";
import Image from 'next/image'
import EyeOpen from '@/app/assets/images/EyeOpen.png'
import EyeClose from '@/app/assets/images/EyeClose.png'
import titleImage from '@/app/assets/images/title.png';

export default function SignUp() {

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
          <span>Bem-Vindo à Pousada Quinta do Ypuã!</span>
        </div>
        <div className={styles.containerBody}>
          <div className={styles.container}>
            <div className={styles.span}>
              <span>Faça seu cadastro aqui!</span>
            </div>
            <div className={styles.containerInputName}>
              <div className={styles.inputName}>
                <label for="nome">Nome:</label>
                <input type="text" id="nome" name="nome" className={styles.inputText}></input>
              </div>
              <div className={styles.inputSurname}>
                <label for="surname">Sobrenome:</label>
                <input type="text" id="surname" name="surname" className={styles.inputText}></input>
              </div>
            </div>
            <div className={styles.containerInputText}>
              <div className={styles.inputs}>
                <div className={styles.inputsEmail}>
                  <label for="email">Email:</label>
                  <input type="text" id="email" name="email" className={styles.inputEmailTel}></input>
                </div>
                <div className={styles.inputsCellphone}>
                  <label for="cellphone">Telefone:</label>
                  <input type="text" id="cellphone" name="cellphone" className={styles.inputEmailTel}></input>
                </div>
              </div>
              <div className={styles.containerPasswords}>
                <label for="password" className={styles.labelPass}>Senha:</label>
                <div className={styles.password}>
                  <input type={isShow ? "text" : "password"} id="password" name="password" className={styles.inputPasswords}></input>
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
                <button className={styles.buttonCadastrar}>Cadastrar</button>
              </div>
              <div className={styles.link}>
                <a href="/login">Já possui uma conta? Faça seu login aqui!</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
