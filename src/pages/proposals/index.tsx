import { useEffect, useState } from 'react';
import { useReadContract, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import { GOVERNAUT_GOVERNANCE_CONTRACT } from '@/contracts';
import Link from 'next/link';
import { readContract } from '@wagmi/core'
import { config } from '@/config/wagmi';
import { ethers } from 'ethers';

export default function Proposals() {
  const { data: hash, writeContract, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });
  const [titleSearch, setTitleSearch] = useState('');
  const [proposals, setProposals] = useState<any>([]);

  useEffect(() => {
    loadProposals();
  }, []);
  
  useEffect(() => {
    if (isConfirming) {
      console.log('Transaction is confirming...')
    } else if (isConfirmed) {
      console.log('Transaction confirmed successfully!')
    } else if (error) {
      console.log('Error:', error)
    }
  }, [isConfirming, isConfirmed, error]);

  const loadProposals = async () => {
    const provider = new ethers.JsonRpcProvider('https://base-sepolia.g.alchemy.com/v2/9kDQm4NOLsXPnomPezfxUYPgdMYudqxh');

    const contract = new ethers.Contract(GOVERNAUT_GOVERNANCE_CONTRACT.address, GOVERNAUT_GOVERNANCE_CONTRACT.abi, provider);

    const filter = contract.filters.ProposalCreated();
    const fromBlock = 0;

    try {
      const events = await contract.queryFilter(filter, fromBlock, "latest");
      const formatted = await Promise.all(events.map(async event => {
        const contractInterface = new ethers.Interface(GOVERNAUT_GOVERNANCE_CONTRACT.abi);
        const decodedData = contractInterface.parseLog(event);
        const state = await readContract(config, {
          ...GOVERNAUT_GOVERNANCE_CONTRACT,
          functionName: 'state',
          args: [decodedData?.args[0]],
        })
        
        return {
          state,
          id: decodedData?.args[0],
          proposalId: decodedData?.args[0].toString(),
          proposer: decodedData?.args[1],
          description: decodedData?.args[8],
          blockNumber: event.blockNumber,
          transactionHash: event.transactionHash,
        };
      }));
      console.log(formatted);
      setProposals(formatted);
    } catch (error) {
        console.error("Error fetching past events:", error);
    }
  }

  const castVote = async (proposalId: string, vote: number) => {
    console.log("Casting vote for:", proposalId, "with vote:", vote);
    const proposalIdBigInt = typeof proposalId === 'string' ? BigInt(proposalId) : proposalId;

    writeContract({ 
      ...GOVERNAUT_GOVERNANCE_CONTRACT,
      functionName: 'castVote',
      args: [proposalIdBigInt, vote],
    });
  }

  return (
    <div className='w-screen px-14 py-4'>
      <div className='flex justify-between items-center flex-col md:flex-row gap-10 mb-7'>
        <h1 className='text-5xl font-bold'>Proposals</h1>
        <div className='flex justify-between items-center gap-4'>
          <input
            type='text'
            value={titleSearch}
            placeholder='Search...'
            onChange={(e) => setTitleSearch(e.target.value)}
            className='py-2 border border-gray-300 mt-1 w-full md:w-80 rounded-3xl px-4 focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          <Link href='/proposals/create'>
            <button className='text-white font-bold py-2 px-4 rounded-3xl bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300'>
              Create Proposal
            </button>
          </Link>
        </div>
      </div>
      <div className='space-y-6'>
        {proposals.filter((proposal: any) => proposal.description.toLowerCase().includes(titleSearch.toLowerCase())).map((proposal: any) => (
          <div key={proposal.proposalId} className="border p-6 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-xl font-semibold mb-4">{proposal.description}</h2>
            <p className="text-gray-700 mb-2"><strong>Proposer:</strong> {proposal.proposer}</p>
            <p className="text-gray-700 mb-2"><strong>Block Number:</strong> {proposal.blockNumber}</p>
            <p className="text-gray-700 mb-4"><strong>Transaction Hash:</strong> {proposal.transactionHash}</p>
            <div className='flex justify-between mt-4 space-x-4'>
            <button
              onClick={() => castVote(proposal.proposalId, 1)}
              className='flex-1 text-white font-bold py-2 px-4 rounded-3xl bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300 transition-all duration-200'
            >
              Yes
            </button>
            <button
              onClick={() => castVote(proposal.proposalId, 0)}
              className='flex-1 text-white font-bold py-2 px-4 rounded-3xl bg-gray-500 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all duration-200'
            >
              Abstain
            </button>
            <button
              onClick={() => castVote(proposal.proposalId, 2)}
              className='flex-1 text-white font-bold py-2 px-4 rounded-3xl bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 transition-all duration-200'
            >
              No
            </button>
          </div>

          </div>
        ))}
      </div>
    </div>
  );
}
