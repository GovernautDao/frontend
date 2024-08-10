import Link from 'next/link';
import Logo from '../icons/Logo';

export default function Home() {
  return (
    <div className="w-full flex flex-col items-center justify-center mt-20">
      <Logo className='h-20 mb-4' />
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Welcome to Governaut</h1>
      <p className="text-lg text-gray-600 mb-12 text-center max-w-lg">
        Verified with Worldcoin to ensure human authenticity in all interactions.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl px-4">
        <Link href='/grants'>
          <div className="flex flex-col justify-center items-center h-48 bg-white shadow-md hover:shadow-lg rounded-lg transition-transform transform hover:-translate-y-1 p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Grants</h2>
            <p className="text-center text-gray-600">
              Create and contribute to crypto grants that support innovative projects and ideas.
            </p>
          </div>
        </Link>
        <Link href='/proposals'>
          <div className="flex flex-col justify-center items-center h-48 bg-white shadow-md hover:shadow-lg rounded-lg transition-transform transform hover:-translate-y-1 p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Proposals</h2>
            <p className="text-center text-gray-600">
              Draft and vote on governance proposals to shape the future of the community.
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}
