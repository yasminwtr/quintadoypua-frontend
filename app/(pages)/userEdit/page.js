import styles from "@/app/styles/userEdit.module.css";
import Image from 'next/image'
import EyeOpen from '@/app/assets/images/EyeOpen.png'
import EyeClose from '@/app/assets/images/EyeClose.png'
import imgPhoto from '@/app/assets/images/camera.png'
import sheets from '@/app/assets/images/sheets.png'
import titleImage from '@/app/assets/images/title.png';

export default function SignUp() {
  return (
    <main className={styles.main}>
      {/* <Image
        src={sheets}
        width={500}
        alt="Title photo"
      />
      <Image
        src={sheets}
        width={500}
        alt="Title photo"
      /> */}
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
            <div className={styles.iconImg}>
              <Image
                src={imgPhoto}
                width={80}
                alt="User photo"
              /> 
            </div>
            <div className={styles.span}>
              <span>Alterar foto de perfil</span>
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
                  <label for="email">Atualizar email:</label>
                  <input type="text" id="email" name="email" className={styles.inputEmailTel}></input>
                </div>
                <div className={styles.inputsCellphone}>
                  <label for="cellphone">Atualizar telefone:</label>
                  <input type="text" id="cellphone" name="cellphone" className={styles.inputEmailTel}></input>
                </div>
              </div>
              <div className={styles.containerPasswords}>
                <label for="password" className={styles.labelPass}>Nova senha:</label>
                <div className={styles.password}>
                  <input type="password" id="password" name="password" className={styles.inputPasswords}></input>
                  <Image
                    src={EyeOpen}
                    width={40}
                    alt="eye photo open"
                  />
                </div>
                <label for="confirmPassword" className={styles.labelPass}>Confirmar Senha:</label>
                <div className={styles.confirmPassword}>
                  <input type="password" id="confirmPassword" name="confirmPassword" className={styles.inputPasswords}></input>
                  <Image
                    src={EyeOpen}
                    width={40}
                    alt="eye photo open two"
                  />
                </div>
              </div>
            </div>
            <div className={styles.containerFeet}>
              <div className={styles.button}>
                <button className={styles.buttonCadastrar}>Atualizar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
