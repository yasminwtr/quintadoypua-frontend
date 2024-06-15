import logo from '@/app/assets/images/Vector.png';
import Image from 'next/image'
import useAuth from '@/app/hooks/useAuth';

export default function Navbar() {
  const { user } = useAuth()

  return (
    <header>
      <nav>
        <div className='logo'>
          <Image
            src={logo}
            width={25}
            alt="Logo"
          />
          <a href="/">Quinta do Ypuã</a>
        </div>

        <div className='nav-links'>
          <a href="/">Inicial</a>
          <a href="/reservation">Acomodações</a>
        </div>

        {user ?
          <a id='login-nav'>Entrar</a>
          :
          <div>
            <a href="/userEdit" id='login-nav'>Meu perfil</a>
            <button id='logout-nav'>Sair</button>
          </div>
        }

      </nav>
    </header>
  );
}