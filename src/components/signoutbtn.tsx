import { signOut } from 'next-auth/react';

export default function SignoutBtn() {
  return (
    <>
      <a
        href={`/api/auth/signout`}
        className='flex justify-center items-center gap-x-4 transition-all no-underline bg-gray-900 border border-gray-900 h-[50px] px-6 rounded-xl text-white w-60'
        onClick={(e) => {
          e.preventDefault();
          signOut({ callbackUrl: '/' });
        }}
      >
        Sign out!
      </a>
    </>
  );
}
