import SignoutBtn from '@/components/signoutbtn';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function Grants() {
  const { status } = useSession();
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/grants');
      const data = await res.json();
      setMessage(data.message);
    };

    fetchData();
  }, []);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1 className='text-4xl font-bold text-black'>Grants</h1>
      <p>{message}</p>
      <SignoutBtn />
    </>
  );
}
