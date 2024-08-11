import WorldcoinIcon from "../../icons/Worldcoin";
import { IDKitWidget, ISuccessResult, VerificationLevel } from "@worldcoin/idkit";
import { useAccount, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { useEffect, useState } from "react";
import { ConnectKitButton } from "connectkit";
import { GOVERNAUT_GOVERNANCE_CONTRACT, IDENTITY_MANAGER_CONTRACT } from "@/contracts";
import { decodeAbiParameters, parseAbiParameters } from 'viem'

export default function CreateProposal() {
  const { address, isDisconnected } = useAccount();
  const { data: hash, writeContract, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });
  const [ description, setDescription ] = useState<string>("");

  const handleOnchianVerify = async (verified: ISuccessResult) => {
    const {merkle_root, nullifier_hash, proof} = verified;

    const formattedProof = decodeAbiParameters(
      parseAbiParameters('uint256[8]'),
        proof as `0x${string}`
      )[0];

    writeContract({ 
      ...IDENTITY_MANAGER_CONTRACT,
      functionName: 'verifyAndExecute',
      args: [
        address,
        BigInt(merkle_root),
        BigInt(nullifier_hash),
        formattedProof
      ],
   })
  };

  const handlePropose = () =>  {
    writeContract({ 
      ...GOVERNAUT_GOVERNANCE_CONTRACT,
      functionName: 'propose',
      args: [
        [GOVERNAUT_GOVERNANCE_CONTRACT.address],
        [""],
        [""],
        `"${description}"`,
      ],
   })
  }

  useEffect(() => {
    if (isConfirming) {
      console.log('Transaction is confirming...')
    } else if (isConfirmed) {
      console.log('Transaction confirmed successfully!')
    } else if (error) {
      console.log('Error:', error)
    }
  }, [isConfirming, isConfirmed, error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 w-full">
      <div className="bg-white p-8 rounded-3xl shadow-md w-full max-w-3xl">
        <h2 className="text-2xl mb-4">Create Proposal</h2>
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
            app_id={"app_staging_6c8d4488699bc14d8d580282ac02b9d5" as `app_${string}`}
            action="testing-verfication-action"
            verification_level={VerificationLevel.Orb}
            signal={address}
            onSuccess={(verified) => handleOnchianVerify(verified)} // use onSuccess to call your smart contract
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
          <button
            className="flex justify-center items-center gap-x-4 transition-all no-underline bg-gray-900 border border-gray-900 h-[50px] px-6 rounded-xl text-white w-full"
            onClick={handlePropose}
          >
            Create Proposal
          </button>
      </div>
    </div>
  );
}
