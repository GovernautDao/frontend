import { getSession, useSession } from 'next-auth/react';
import WorldcoinBtn from '../components/worldcoinbtn';
import Logo from '../../icons/Logo';
import GuestBtn from '@/components/guestbtn';

export default function Home() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  return (
    <div className='w-screen h-screen flex justify-center'>
      <div className='flex flex-col gap-44 mt-7 w-96 items-center'>
        <Logo width={385} height={385} />
        <div className='w-full flex flex-col gap-4'>
          <GuestBtn />
          <WorldcoinBtn />
        </div>
      </div>
    </div>
  );
}
