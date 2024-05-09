import PousadaLogo from '@/app/assets/vectors/logo.png'
import Image from 'next/image'

export default function Navbar() {
    return (
      <header> 
        <nav className='flex justify-between py-4 px-20'>
          
        <Image
          src={PousadaLogo}
          alt="Logo pousada"
          className=' w-48 h-9'
        />

          <ul className='flex gap-24'>
            <li className='text-black leading-normal text-lg font-bold'><a href="#">Inicial</a></li>
            <li className='text-black leading-normal text-lg font-bold'><a href="#">Acomodações</a></li>
          </ul>
            
            <button className='bg-[#046E1B] rounded-lg  px-6 text-white shadow-lg'>
              Entrar
            </button>
        </nav>
      </header>
    );
  }