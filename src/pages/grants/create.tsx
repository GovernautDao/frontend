import { useAccount } from 'wagmi';
import { FormEvent, useState } from 'react';
import { ConnectKitButton } from 'connectkit';

interface GrantForm {
  fundsToRaise: string;
}

const MAX_ETH = 10000;

export default function CreateGrant() {
  const { isDisconnected } = useAccount();
  // TODO: Figure out how to call the smart contract to check if the user has an approved proposal
  const [isApproved, setIsApproved] = useState(true);
  const [formData, setFormData] = useState<GrantForm>({
    //add the fields
    fundsToRaise: '',
  });
  const [formErrors, setFormErrors] = useState<GrantForm>({
    fundsToRaise: '',
  });

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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    console.log('submitting');
  };

  return (
    <>
      {isDisconnected && (
        <>
          {/* TODO: Add a nicer modal and message to ensure the user has their wallet connected before they can get to this view */}
          Wallet must be connected to create a grant
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
        </>
      )}
      {!isDisconnected && !isApproved && (
        // TODO: Add a nicer error page when they have no approved proposals
        <div>
          Unfortunately no access since user does not have an approved proposal
        </div>
      )}
      {!isDisconnected && (
        <div className='min-h-screen flex items-center justify-center bg-gray-100 w-full'>
          <div className='bg-white p-8 rounded-3xl shadow-md w-full max-w-3xl'>
            <h2 className='text-2xl mb-4'>Create Grant</h2>
            <form onSubmit={(e) => handleSubmit(e)}>
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
                  //TODO: Make border for error field red in create grant page
                  className='w-full p-2 border border-gray-300 rounded-lg mt-1'
                  required
                />
                {formErrors.fundsToRaise.length > 0 && (
                  <span className='text-red-500 text-sm'>
                    {formErrors.fundsToRaise}
                  </span>
                )}
              </div>
              {/* TODO: Make the button fit the style of the page */}
              <button
                type='submit'
                className='w-full bg-black text-white p-2 rounded-lg'
              >
                Create
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
