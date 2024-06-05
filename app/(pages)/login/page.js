"use client"
import { useState } from 'react';
import styles from "@/app/styles/login.module.css";
import Image from 'next/image'
import EyeOpen from '@/app/assets/images/EyeOpen.png'
import EyeClose from '@/app/assets/images/EyeClose.png'
import sheets from '@/app/assets/images/sheets.png'
import titleImage from '@/app/assets/images/title.png';

export default function Login() {

    const [isShow, setIsShow] = useState(false);
    const handlePassword = () => setIsShow(!isShow);

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
                <div className={styles.containerCentral}>
                    <div className={styles.title}>
                        <span>Bem-Vindo à Pousada Quinta do Ypuã!</span>
                    </div>
                    <div className={styles.containerBody}>
                        <div className={styles.container}>
                            <div className={styles.span}>
                                <span>Faça seu login aqui!</span>
                            </div>
                            <div className={styles.containerInputText}>
                                <div className={styles.inputs}>
                                    <div className={styles.inputsEmail}>
                                        <label for="email">Email:</label>
                                        <input type="text" id="email" name="email" className={styles.inputEmailTel}></input>
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
                                </div>
                            </div>
                            <div className={styles.containerFeet}>
                                <div className={styles.button}>
                                    <button className={styles.buttonCadastrar}>Login</button>
                                </div>
                                <div className={styles.link}>
                                    <a href="/signup">Ainda não possui uma conta? Faça seu cadastro aqui!</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
