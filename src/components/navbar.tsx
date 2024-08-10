import { ConnectKitButton } from 'connectkit';
import Logo from '../icons/Logo';
import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className='bg-white border-gray-200 shadow-lg'>
      <div className='flex flex-wrap justify-between p-4'>
        <Link
          href='/'
          className='flex items-center space-x-3 rtl:space-x-reverse'
        >
          <Logo className='h-8' />
          <span className='self-center text-2xl whitespace-nowrap text-black font-bold'>
            Governaut
          </span>
        </Link>
        <div className={`w-full md:block md:w-auto`} id='navbar-default'>
          <ul className='font-medium flex flex-col md:flex-row p-4 md:p-0 mt-4 md:mt-0 border border-gray-100 rounded-lg bg-gray-50 md:border-0 md:bg-white md:items-center gap-2 text-co'>
            <li className='mb-2 md:mb-0'>
              <Link
                href='/'
                className='block py-2 px-3 font-bold text-blue-500 hover:text-blue-700 hover:bg-blue-100 rounded-lg'
                aria-current='page'
              >
                Grants
              </Link>
            </li>
            <li className='md:flex md:items-center'>
              <div className='block py-2 px-3 md:py-0'>
                <ConnectKitButton theme='nouns' />
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
