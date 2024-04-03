import styles from "@/app/page.module.css";
import Image from 'next/image'
import welcomeImage from '@/app/assets/images/welcome.png';
import { Rate } from "antd";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.welcome}>
        <div>
          <span>Bem-Vindo à Pousada Quinta do Ypuã!</span>
          <span>Descubra um refúgio de tranquilidade e conforto, onde cada detalhe é cuidadosamente planejado para tornar sua estadia inesquecível. Explore nossas acomodações, faça sua reserva de maneira fácil e rápida, e compartilhe momentos especiais conosco.</span>
          <button>Ver acomodações</button>
        </div>

        <Image
          src={welcomeImage}
          width={500}
          alt="Home photo"
        />
      </div>

      <div className={styles.rooms}>
        <div className={styles.header_rooms}>
          <div>
            <span>Explore, reserve, aproveite</span>
            <span>Veja as nossas acomodações mais populares</span>

          </div>
          <button>Ver todas</button>

        </div>

        <div className={styles.options}>
          <div className={styles.room}>
            <div></div>

            <div>
              <span>Quarto Sacada</span>
              <span>Ver acomodação</span>
            </div>
          </div>

          <div className={styles.room}>
            <div></div>

            <div>
              <span>Quarto Sacada</span>
              <span>Ver acomodação</span>
            </div>
          </div>

          <div className={styles.room}>
            <div></div>

            <div>
              <span>Quarto Sacada</span>
              <span>Ver acomodação</span>
            </div>
          </div>

          <div className={styles.room}>
            <div></div>

            <div>
              <span>Quarto Sacada</span>
              <span>Ver acomodação</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.about}>
        <div>
          <span>Sobre a pousada</span>
          <span>A pousada Quinta do Ypuã oferece ao seus clientes um recanto de aconchego e lazer, em ambiente  rústico e agradável. Ideal para quem gosta de fugir da rotina e procura um local de paz para descansar e curtir a natureza.</span>
          <button>Quero fazer minha reserva</button>
        </div>
      </div>

      <div className={styles.reviews_container}>
        <span className={styles.title_reviews}>De nossos hóspedes</span>

        <div className={styles.reviews}>
          <div className={styles.review}>
            <div className={styles.reviews_user}>
              <div></div>

              <div>
                <span>Hospitalidade excepcional</span>
                <span>Yasmin T.</span>
              </div>
            </div>

            <div className={styles.stars}>
              <Rate defaultValue={5} />
            </div>

            <span className={styles.description_review}>Minha estadia na Pousada Quinta do Ypuã foi simplesmente magnífica! O atendimento da equipe foi caloroso e profissional, e as acomodações eram impecáveis.</span>
          </div>

          <div className={styles.review}>
            <div className={styles.reviews_user}>
              <div></div>

              <div>
                <span>Hospitalidade excepcional</span>
                <span>Yasmin T.</span>
              </div>
            </div>

            <div className={styles.stars}>
              <Rate defaultValue={5} />
            </div>

            <span className={styles.description_review}>Minha estadia na Pousada Quinta do Ypuã foi simplesmente magnífica! O atendimento da equipe foi caloroso e profissional, e as acomodações eram impecáveis.</span>
          </div>
        </div>

        <div className={styles.pagination}>
          <div></div>
          <button><FaAngleLeft size={18}/></button>
          <button><FaAngleRight size={18}/></button>
        </div>
      </div>
    </main>
  );
}
