import { IDKitWidget, ISuccessResult } from "@worldcoin/idkit";
import { useAccount } from "wagmi";
import { useState } from "react";
import WorldcoinIcon from "../../icons/Worldcoin";
import ConnectModal from "../../components/connectmodal";
import { ConnectKitButton } from "connectkit";

export default function CreateProposal() {
  const { address, isDisconnected } = useAccount();
  const [formData, setFormData] = useState({
    //add the fields
    title: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (verified: ISuccessResult) => {
    // Call smart contract here with verified data and formData
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 w-full">
      <div className="bg-white p-8 rounded-3xl shadow-md w-full max-w-3xl">
        <h2 className="text-2xl mb-4">Create Proposal</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg mt-1"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg mt-1"
              rows={4}
              required
            />
          </div>
          {isDisconnected && (
            <ConnectKitButton.Custom>
              {({ show }) => {
                return (
                  <button
                    onClick={show}
                    className="flex justify-center items-center gap-x-4 transition-all no-underline border border-gray-900 h-[50px] px-6 rounded-xl text-black w-full mb-4"
                  >
                    Connect Wallet
                  </button>
                );
              }}
            </ConnectKitButton.Custom>
          )}
          <IDKitWidget
            app_id={process.env.WLD_CLIENT_ID as `app_${string}`}
            action="testing-verfication-action"
            signal={address}
            onSuccess={(verified) => handleSubmit(verified)} // use onSuccess to call your smart contract
          >
            {({ open }) => (
              <button
                className="flex justify-center items-center gap-x-4 transition-all no-underline bg-gray-900 border border-gray-900 h-[50px] px-6 rounded-xl text-white w-full"
                onClick={open}
              >
                <WorldcoinIcon
                  height={21}
                  width={21}
                  fill="white"
                  stroke="white"
                />
                Verify and Submit
              </button>
            )}
          </IDKitWidget>
        </form>
      </div>
    </div>
  );
}
