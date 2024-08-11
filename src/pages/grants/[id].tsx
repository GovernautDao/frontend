import { useRouter } from 'next/router';
import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import { FUNDING_CONTRACT } from '@/contracts';
import { useEffect, useState } from 'react';
import { GrantDetails } from '@/interfaces/GrantDetails';
import { grantsFromContract, proposalData } from '../../../data/grantsTestData';
import TextSection from '@/components/textSection';
import { ethers } from 'ethers';
import { ContributionStatusFromContract } from '@/interfaces/ContributionStatusFromContract';

// TODO: Ask user to give permission for ERC20 token transfer, but which token we using???
export default function ViewProposal() {
  const router = useRouter();
  const { chainId, address } = useAccount();
  const {
    data: grantData,
    isError: isGrantFetchError,
    isLoading: isGrantFetchLoading,
    refetch: refetchGrant,
  } = useReadContract({
    abi: FUNDING_CONTRACT.abi,
    address: FUNDING_CONTRACT[chainId ?? 0]?.address,
    functionName: 'getGrantStatus',
    args: [parseInt(router.query.id as string)],
  });
  const {
    data: contributionStatusData,
    isLoading: isContributionStatusLoading,
    refetch: refetchContributionStatus,
  } = useReadContract({
    abi: FUNDING_CONTRACT.abi,
    address: FUNDING_CONTRACT[chainId ?? 0]?.address,
    functionName: 'getContributionStatus',
    args: [parseInt(router.query.id as string)],
    query: {
      enabled: false,
    },
  });
  const {
    writeContract: contribute,
    isSuccess: isSuccessContribution,
    isError: isErrorContribution,
  } = useWriteContract();
  const {
    writeContract: claim,
    isSuccess: isSuccessClaim,
    isError: isErrorClaim,
  } = useWriteContract();
  const {
    writeContract: withdraw,
    isSuccess: isSuccessWithdraw,
    isError: isErrorWithdraw,
  } = useWriteContract();
  const [amountContributed, setAmountContributed] = useState<bigint>(BigInt(0));
  const [grant, setGrant] = useState<GrantDetails | null>(null);
  const [canContribute, setCanContribute] = useState(false);
  const [canClaim, setCanClaim] = useState(false);
  const [canWithdraw, setCanWithdraw] = useState(false);
  const [amount, setAmount] = useState('');

  useEffect(() => {
    if (!isGrantFetchLoading && grantData) {
      // TODO: Find the proposal info in db
      // TODO: Once there is on chain data use that instead
      const grantId = parseInt(router.query.id as string);
      setGrant({
        id: grantId,
        projectOwner: grantsFromContract[grantId].result.projectOwner,
        title: proposalData[grantId].title,
        description: proposalData[grantId].description,
        startDate: new Date(
          Number(grantsFromContract[grantId].result.startTimestamp) * 1000
        ),
        endDate: new Date(
          Number(grantsFromContract[grantId].result.endTimestamp) * 1000
        ),
        goalAmount: grantsFromContract[grantId].result.goalAmount,
        totalContributed: grantsFromContract[grantId].result.totalContributed,
        numberOfClaimsMade: Number(
          grantsFromContract[grantId].result.numberOfClaimsMade
        ),
        lastClaimDate: new Date(
          Number(grantsFromContract[grantId].result.lastClaimTimestamp) * 1000
        ),
      });

      refetchContributionStatus();
    }
  }, [grantData, isGrantFetchLoading]);

  // figure out if the user can contribute
  useEffect(() => {
    if (grant !== null) {
      if (
        grant.projectOwner !== address &&
        grant.endDate > new Date() &&
        grant.totalContributed < grant.goalAmount
      ) {
        setCanContribute(true);
      }
    }
  }, [grant]);

  useEffect(() => {
    if (!isContributionStatusLoading && contributionStatusData) {
      setAmountContributed(
        (contributionStatusData as ContributionStatusFromContract).result
          .amountContributed
      );
    }
  }, [contributionStatusData, isContributionStatusLoading]);

  // figure out if the user can claim
  useEffect(() => {
    if (grant !== null) {
      if (
        grant.projectOwner === address &&
        grant.numberOfClaimsMade < 4 &&
        grant.endDate < new Date() &&
        grant.totalContributed >= grant.goalAmount
      ) {
        setCanClaim(true);
      }
    }
  }, [grant]);

  // figure out if the user can withdraw
  useEffect(() => {
    if (grant !== null) {
      if (
        grant.projectOwner !== address &&
        grant.endDate < new Date() &&
        grant.totalContributed < grant.goalAmount &&
        amountContributed > BigInt(0)
      ) {
        setCanWithdraw(true);
      }
    }
  }, [grant, amountContributed]);

  // figure out if the user can claim
  useEffect(() => {
    if (grant !== null) {
      if (
        grant.projectOwner === address &&
        grant.endDate < new Date() &&
        grant.totalContributed >= grant.goalAmount &&
        grant.numberOfClaimsMade < 4
      ) {
        setCanClaim(true);
      }
    }
  }, [grant]);

  const handleContribute = () => {
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

    contribute({
      abi: FUNDING_CONTRACT.abi,
      address: address,
      functionName: 'contribute',
      args: [
        parseInt(router.query.id as string),
        ethers.utils.parseEther(amount),
      ],
    });
  };

  useEffect(() => {
    if (isSuccessContribution) {
      refetchContributionStatus();
      refetchGrant();
      // TODO: present a success message to the user
    } else if (isErrorContribution) {
      // TODO: present an error message to the user
      console.error('Error contributing to grant');
    }
  }, [isErrorContribution, isSuccessContribution]);

  const handleClaim = () => {
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

    claim({
      abi: FUNDING_CONTRACT.abi,
      address: address,
      functionName: 'claimFunds',
      args: [parseInt(router.query.id as string)],
    });
  };

  useEffect(() => {
    if (isSuccessClaim) {
      // TODO: present a success message to the user
      refetchGrant();
      console.log('Successfully claimed funds');
    } else if (isErrorClaim) {
      // TODO: present an error message to the user
      console.error('Error claiming funds');
    }
  }, [isErrorClaim, isSuccessClaim]);

  const handleWithdraw = () => {
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

    withdraw({
      abi: FUNDING_CONTRACT.abi,
      address: address,
      functionName: 'claimContributionRefund',
      args: [parseInt(router.query.id as string)],
    });
  };

  useEffect(() => {
    if (isSuccessWithdraw) {
      // TODO: present a success message to the user
      refetchGrant();
      console.log('Successfully withdrew funds');
    } else if (isErrorWithdraw) {
      // TODO: present an error message to the user
      console.error('Error withdrawing funds');
    }
  }, [isErrorWithdraw, isSuccessWithdraw]);

  return (
    <>
      {!grant && isGrantFetchError && <div>Error fetching grant...</div>}
      {grant && (
        <div className='m-10 bg-white border rounded-3xl p-10 shadow-sm border-1 border-gray-400'>
          <div className='mb-4'>
            <TextSection title='Title' text={grant.title ?? ''} />
          </div>
          <div className='mb-4'>
            <TextSection title='Description' text={grant.description ?? ''} />
          </div>
          <div className='mb-4'>
            <TextSection
              title='Project Owner'
              text={grant?.projectOwner ?? ''}
            />
          </div>
          <div className='mb-4'>
            <TextSection
              title='Start Date'
              text={grant.startDate.toString() ?? ''}
            />
          </div>
          <div className='mb-4'>
            <TextSection
              title='End Date'
              text={grant.endDate.toString() ?? ''}
            />
          </div>
          <div className='mb-4'>
            <TextSection
              title='Goal Amount'
              text={`${ethers.utils.formatEther(
                grant.goalAmount.toString()
              )} ETH`}
            />
          </div>
          <div className='mb-4'>
            <TextSection
              title='Total Contributed'
              text={`${ethers.utils.formatEther(
                grant.totalContributed.toString()
              )} ETH`}
            />
          </div>
          <div className='mb-4'>
            <TextSection
              title='Number of Claims Made'
              text={grant.numberOfClaimsMade.toString() ?? ''}
            />
          </div>
          <div className='mb-4'>
            <TextSection
              title='Last Claim Date'
              text={
                grant.numberOfClaimsMade > 0
                  ? grant.lastClaimDate.toString() ?? ''
                  : 'No claims made yet'
              }
            />
          </div>
          <div className='mb-4'>
            <TextSection
              title='Amount Contributed'
              text={`${ethers.utils.formatEther(
                amountContributed.toString()
              )} ETH`}
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='amount'>Amount</label>
            <input
              id='amount'
              title='amount'
              type='text'
              placeholder='Enter amount to contribute / withdraw in ETH'
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
          <div className='flex gap-5'>
            <button
              className='bg-blue-600 rounded-lg py-2 px-4 text-white font-bold hover:bg-blue-800 disabled:opacity-50'
              disabled={!canContribute}
              onClick={handleContribute}
            >
              Contribute
            </button>
            <button
              className='bg-green-600 rounded-lg py-2 px-4 text-white font-bold hover:bg-green-800 disabled:opacity-50'
              disabled={!canClaim}
              onClick={handleClaim}
            >
              Claim
            </button>
            <button
              className='bg-orange-600 rounded-lg py-2 px-4 text-white font-bold hover:bg-orange-800 disabled:opacity-50'
              disabled={!canWithdraw}
              onClick={handleWithdraw}
            >
              Withdraw
            </button>
          </div>
        </div>
      )}
    </>
  );
}
