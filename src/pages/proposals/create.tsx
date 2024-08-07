import { IDKitWidget, ISuccessResult } from "@worldcoin/idkit";
import { useAccount } from "wagmi";
import { useState } from 'react';
import WorldcoinIcon from "../../../icons/Worldcoin";
import ConnectModal from "@/components/connectModal";

export default function CreateProposal() {
  const { address, isDisconnected } = useAccount();
  const [formData, setFormData] = useState({ //add the fields
    name: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (verified: ISuccessResult) => {
    // Call smart contract here with verified data and formData
  }

  if (isDisconnected) {
    return <ConnectModal />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-3xl shadow-md w-full max-w-md">
        <h2 className="text-2xl mb-4">Create Proposal</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg mt-1"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-gray-700">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg mt-1"
              rows={4}
              required
            />
          </div>
          <IDKitWidget
            app_id={process.env.WLD_CLIENT_ID as `app_${string}`}
            action="testing-verfication-action"
            signal={address}
            onSuccess={(verified) => handleSubmit(verified)} // use onSuccess to call your smart contract
          >
            {({ open }) => <button className='flex justify-center items-center gap-x-4 transition-all no-underline bg-gray-900 border border-gray-900 h-[50px] px-6 rounded-xl text-white w-full' onClick={open}>
              <WorldcoinIcon height={21} width={21} fill='white' stroke='white' />
              Verify and Submit
              </button>}
          </IDKitWidget>
        </form>
      </div>
    </div>
  );
};