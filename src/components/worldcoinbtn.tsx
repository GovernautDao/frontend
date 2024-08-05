import { signIn } from 'next-auth/react';
import WorldcoinIcon from '../../icons/Worldcoin';

// The approach used in this component shows how to build a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.
export default function WorldcoinBtn() {
  return (
    <>
      <a
        href={`/api/auth/signin`}
        className='flex justify-center items-center gap-x-4 transition-all no-underline bg-gray-900 border border-gray-900 h-[50px] px-6 rounded-xl text-white w-full'
        onClick={(e) => {
          e.preventDefault();
          signIn('worldcoin', { callbackUrl: '/grants' });
        }}
      >
        <WorldcoinIcon height={21} width={21} fill='white' stroke='white' />
        <span className='text-base leading-normal font-sora font-semibold'>
          Sign in with World ID
        </span>
      </a>
    </>
  );
}
