"use client"
import { useContext, useState, useEffect } from 'react';
import logo from '@/app/assets/images/Vector.png';
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import AuthContext from '@/app/auth/AuthContext';

export default function Navbar() {
  const { getTokenFromStorage, logout } = useContext(AuthContext);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedToken = getTokenFromStorage();
    setToken(storedToken);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <header>
        <nav>
        </nav>
      </header>
    );
  }

  return (
    <header>
      <nav>
        <div className='logo'>
          <Image
            src={logo}
            width={25}
            alt="Logo"
          />
          <a>Quinta do Ypuã</a>
        </div>

        {token !== null ?
          <>
            <div className='nav-links'>
              <a onClick={() => router.push('/myReservation')}>Reservas</a>
              <a onClick={() => router.push('/reservation')}>Acomodações</a>
            </div>

            <div>
              <a onClick={() => router.push('/userEdit')} id='login-nav'>Minha conta</a>
              <button id='logout-nav' onClick={logout}>Sair</button>
            </div>
          </>
          :
          <>
            <div className='nav-links'>
              <a onClick={() => router.push('/')}>Inicial</a>
              <a onClick={() => router.push('/reservation')}>Acomodações</a>
            </div>

            <a onClick={() => router.push('/login')} id='login-nav'>Entrar</a>
          </>
        }
      </nav>
    </header>
  );
}