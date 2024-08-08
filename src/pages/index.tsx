import GrantsList from '@/components/grantslist';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const [search, setSearch] = useState('');

  return (
    <div className='w-screen p-8'>
      <div className='flex justify-between flex-col gap-10 mb-7'>
        <h1 className='text-5xl font-bold'>Grants</h1>
        <div className='flex justify-between'>
          <Input
            type='text'
            placeholder='Search...'
            className='w-1/5 rounded-3xl'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Link href='/proposals/create'>
            <button className='text-black font-bold py-2 px-4 rounded-3xl border-black border hover:bg-gray-300'>
              Create Proposal
            </button>
          </Link>
        </div>
      </div>
      <GrantsList filter={search ?? ''} />
    </div>
  );
}
