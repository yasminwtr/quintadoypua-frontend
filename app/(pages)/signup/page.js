"use client"
import { useState, useContext } from 'react';
import styles from "@/app/styles/sign.module.css";
import Image from 'next/image'
import EyeOpen from '@/app/assets/images/EyeOpen.png'
import EyeClose from '@/app/assets/images/EyeClose.png'
import { useRouter } from 'next/navigation';
import api from '@/app/api/api';
import withoutAuth from '@/app/auth/withoutAuth';
import AuthContext from '@/app/auth/AuthContext';

function SignUp() {
  const router = useRouter();
  const [isShow, setIsShow] = useState(false);
  const handlePassword = () => setIsShow(!isShow);
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password || !formData.name) {
      alert('Por favor preencha todos os campos.');
      return;
    }

    try {
      const response = await api.post("/client/register", {
        email: formData.email,
        password: formData.password,
        name: formData.name,
      });

      if (response.status >= 200 && response.status < 300) {
        login({
          email: formData.email,
          name: formData.name
        })

      } else {
        console.error('Registration failed with status code:', response.status);
        console.error('Error details:', response.data);
      }

    } catch (error) {
      console.log(error);

    }
  }

  return (
    <main className={styles.main}>

      <div className={styles.welcome}>
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
                <label>Nome:</label>
                <input type="text" id="nome" name="name" className={styles.inputText}
                  value={formData.name}
                  onChange={handleChange}
                ></input>
              </div>
            </div>

            <div className={styles.containerInputText}>
              <div className={styles.inputs}>
                <div className={styles.inputsEmail}>
                  <label>Email:</label>
                  <input type="text" id="email" name="email" className={styles.inputEmailTel}
                    value={formData.email}
                    onChange={handleChange}
                  ></input>
                </div>
              </div>

              <div className={styles.containerPasswords}>
                <label className={styles.labelPass}>Senha:</label>
                <div className={styles.password}>
                  <input
                    type={isShow ? "text" : "password"}
                    id="password"
                    name="password"
                    className={styles.inputPasswords}
                    value={formData.password}
                    onChange={handleChange}
                  ></input>

                  <button onClick={handlePassword} type="button" className={styles.eye_button}>
                    {isShow && <Image src={EyeClose} width={30} alt="eye photo open two" />}
                    {!isShow && <Image src={EyeOpen} width={30} alt="eye photo open two" />}
                  </button>
                </div>
              </div>
            </div>

            <div className={styles.containerFeet}>
              <div className={styles.button}>
                <button className={styles.buttonCadastrar} type="submit" onClick={(e) => handleSubmit(e)}>Cadastrar</button>
              </div>
              <div className={styles.link}>
                <a onClick={() => router.push('/login')}>Já possui uma conta? Faça seu login aqui!</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default withoutAuth(SignUp);