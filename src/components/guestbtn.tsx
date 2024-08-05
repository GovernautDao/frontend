import { signIn } from 'next-auth/react';
import ArrowForward from '../../icons/ArrowForward';

export default function GuestBtn() {
  return (
    <a
      href={`/api/auth/signin`}
      className='flex justify-center items-center gap-x-4 transition-all no-underline border border-gray-900 h-[50px] px-6 rounded-xl text-black w-full'
      onClick={(e) => {
        e.preventDefault();
        signIn('guest', { callbackUrl: '/grants' });
      }}
    >
      <span className='text-base leading-normal font-sora font-semibold'>
        Continue as guest
      </span>
      <ArrowForward height={21} width={21} fill='white' />
    </a>
  );
}
