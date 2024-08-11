import { useAccount, useWriteContract } from 'wagmi';
import { FormEvent, useEffect, useState } from 'react';
import { ConnectKitButton } from 'connectkit';
import { useRouter } from 'next/router';
import { FUNDING_CONTRACT } from '@/contracts';
import { ethers } from 'ethers';

interface GrantForm {
  title: string;
  description: string;
  fundsToRaise: string;
}

const MAX_ETH = 10000;

export default function CreateGrant() {
  const { writeContract, isSuccess, isError, error } = useWriteContract();
  const { isDisconnected, chainId } = useAccount();
  const [formData, setFormData] = useState<GrantForm>({
    // TODO: Call contract to get the title or description
    title: 'Mock Title',
    description: 'Mock Description',
    fundsToRaise: '',
  });
  const [formErrors, setFormErrors] = useState<GrantForm>({
    title: '',
    description: '',
    fundsToRaise: '',
  });
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === 'fundsToRaise') {
      if (isNaN(Number(value))) {
        setFormErrors({
          ...formErrors,
          fundsToRaise: 'Funds to raise must be a number',
        });
      } else if (Number(value) < 0) {
        setFormErrors({
          ...formErrors,
          fundsToRaise: 'Funds to raise must be greater than 0',
        });
      } else if (Number(value) > MAX_ETH) {
        setFormErrors({
          ...formErrors,
          fundsToRaise: `Funds to raise must be less than ${MAX_ETH}`,
        });
      } else {
        setFormErrors({ ...formErrors, fundsToRaise: '' });
      }
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // TODO: display error messages to user
    if (!chainId) {
      console.error('Chain ID is undefined');
      return;
    }

    const address = FUNDING_CONTRACT[chainId]?.address;

    // TODO: display error messages to user
    if (!address) {
      console.error('Funding contract address is undefined');
      return;
    }

    writeContract({
      abi: FUNDING_CONTRACT.abi,
      address: address,
      functionName: 'createGrant',
      args: [address, ethers.utils.parseUnits(formData.fundsToRaise, 18)],
    });
  };

  useEffect(() => {
    if (isSuccess) {
      // TODO: Alert the user that the grant was created successfully
      router.push('/grants');
    }
  }, [isSuccess]);

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 w-full'>
      <div className='bg-white p-8 rounded-3xl shadow-md w-full max-w-3xl'>
        <h2 className='text-2xl mb-4'>Create Grant</h2>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className='mb-4'>
            <label htmlFor='title' className='block text-gray-700'>
              Title
            </label>
            <input
              type='text'
              id='title'
              name='title'
              value={formData.title}
              onChange={handleChange}
              className='w-full p-2 border border-gray-300 rounded-lg mt-1'
              disabled
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='description' className='block text-gray-700'>
              Description
            </label>
            <textarea
              id='description'
              name='description'
              value={formData.description}
              onChange={handleChange}
              className='w-full p-2 border border-gray-300 rounded-lg mt-1'
              rows={4}
              disabled
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='fundsToRaise' className='block text-gray-700'>
              Funds to Raise (ETH)
            </label>
            <input
              type='text'
              id='fundsToRaise'
              name='fundsToRaise'
              value={formData.fundsToRaise}
              onChange={handleChange}
              placeholder='Enter the amount of funds you want to raise (ex: 1000 means 1000 ETH)'
              className={`w-full p-2 border border-gray-300 rounded-lg mt-1 ${
                formErrors.fundsToRaise.length > 0
                  ? 'border-red-500  outline-red-500'
                  : ''
              }`}
              required
            />
            {formErrors.fundsToRaise.length > 0 && (
              <span className='text-red-500 text-sm'>
                {formErrors.fundsToRaise}
              </span>
            )}
          </div>
          {isDisconnected && (
            <ConnectKitButton.Custom>
              {({ show }) => {
                return (
                  <button
                    onClick={show}
                    className='flex justify-center items-center gap-x-4 transition-all no-underline border border-gray-900 h-[50px] px-6 rounded-xl text-black w-full mb-4'
                  >
                    Connect Wallet
                  </button>
                );
              }}
            </ConnectKitButton.Custom>
          )}
          <button
            type='submit'
            className='w-full bg-black text-white p-2 py-3 rounded-lg disabled:opacity-50'
            disabled={
              formErrors.fundsToRaise.length > 0 || formData.fundsToRaise === ''
            }
          >
            Create
          </button>
        </form>
        {isError && (
          <div className='text-red-500 font-bold'>
            {error.message.includes('Error: UserIsntAnApprovedProposer')
              ? 'Error: You are not an approved proposer'
              : 'Error: Failed to complete transaction'}
          </div>
        )}
      </div>
    </div>
  );
}
