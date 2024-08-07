import GrantsList from '@/components/grantslist';
import Link from 'next/link';

export default function Home() {

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Grants</h1>
        <Link href="/proposals/create" >
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Create Proposal
          </button>
        </Link>
      </div>
      <GrantsList />
    </div>
  );
}
