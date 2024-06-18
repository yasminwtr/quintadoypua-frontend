"use client"
import { useState, useContext } from 'react';
import styles from "@/app/styles/login.module.css";
import Image from 'next/image'
import EyeOpen from '@/app/assets/images/EyeOpen.png'
import EyeClose from '@/app/assets/images/EyeClose.png'
import AuthContext from '@/app/auth/AuthContext';
import withoutAuth from '@/app/auth/withoutAuth';
import { useRouter } from 'next/navigation';

function Login() {
    const router = useRouter();
    const [isShow, setIsShow] = useState(false);
    const handlePassword = () => setIsShow(!isShow);
    const { login } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        login(formData);
    };

    return (
        <main className={styles.main}>
            <div className={styles.welcome}>
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
                                        <label>Email:</label>
                                        <input type="text" id="email" name="email" className={styles.inputEmailTel}
                                            value={formData.email}
                                            onChange={handleChange}></input>
                                    </div>
                                </div>
                                <div className={styles.containerPasswords}>
                                    <label className={styles.labelPass}>Senha:</label>
                                    <div className={styles.password}>
                                        <input type={isShow ? "text" : "password"} id="password" name="password" className={styles.inputPasswords}
                                            value={formData.password}
                                            onChange={handleChange}></input>
                                        <button onClick={handlePassword} type="button" className={styles.eye_button}>
                                            {isShow && <Image src={EyeClose} width={30} alt="eye photo open two" />}
                                            {!isShow && <Image src={EyeOpen} width={30} alt="eye photo open two" />}
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.containerFeet}>
                                <div className={styles.button}>
                                    <button className={styles.buttonCadastrar} type="submit" onClick={(e) => handleSubmit(e)}>Login</button>
                                </div>
                                <div className={styles.link}>
                                    <a onClick={() => router.push('/signup')}>Não possui uma conta? Faça seu cadastro aqui!</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default withoutAuth(Login);