import Link from 'next/link';
import { useEffect, useState } from 'react';
import { grantsFromContract, proposalData } from '../../../data/grantsTestData';
import { differenceInDays } from 'date-fns';
import { GrantDetails } from '@/interfaces/GrantDetails';
import { useAccount, useReadContracts } from 'wagmi';
import { FUNDING_CONTRACT } from '@/contracts';
import { ethers } from 'ethers';
import { GrantFromContract } from '@/interfaces/GrantFromContract';

const maxGrantId = 3;

// TODO: replace X with the last grantId assigned once call is made available
const getXGrantIds = (lastId: number, chainId?: number) => {
  if (!chainId) {
    // TODO: throw an error visible to user
    return console.error('Chain ID is required');
  }

  const grantIds = [];

  for (let i = 0; i <= lastId; i++) {
    grantIds.push(i);
  }

  const calls = grantIds.map((id) => {
    return {
      abi: FUNDING_CONTRACT.abi,
      // TODO: handle this better
      address: FUNDING_CONTRACT[chainId]?.address ?? '0x000',
      functionName: 'getGrantStatus',
      args: [id],
      chainId: chainId,
    };
  });

  return calls;
};

export default function Grants() {
  const { chainId } = useAccount();
  const result = useReadContracts({
    // TODO: fix the type issues here
    contracts: getXGrantIds(maxGrantId, chainId) as any[],
  });

  const [titleSearch, setTitleSearch] = useState('');
  //TODO: iterate from id 0 to until we stop getting ids in the contract using getGrantStatus
  const [grantsList, setGrantsList] = useState<GrantDetails[]>([]);
  const [filteredGrantsList, setFilteredGrantsList] = useState<GrantDetails[]>(
    []
  );

  useEffect(() => {
    if (result.isSuccess && grantsList.length === 0) {
      const grants = [
        ...(result.data as GrantFromContract[]).filter((data) =>
          ethers.utils.isAddress(data.result.projectOwner)
        ),
        ...grantsFromContract,
      ];

      // TODO: figure out how to get the title/description for each of those grants
      setGrantsList(
        grants.map((grant, index) => {
          return {
            id: index,
            projectOwner: grant.result.projectOwner,
            startDate: new Date(Number(grant.result.startTimestamp) * 1000),
            endDate: new Date(Number(grant.result.endTimestamp) * 1000),
            goalAmount: grant.result.goalAmount,
            totalContributed: grant.result.totalContributed,
            numberOfClaimsMade: Number(grant.result.numberOfClaimsMade),
            lastClaimDate: new Date(
              Number(grant.result.lastClaimTimestamp) * 1000
            ),
            title: proposalData[index].title,
            description: proposalData[index].description,
          };
        })
      );
    }
  }, [result, grantsList]);

  useEffect(() => {
    formatAndFilterGrants(titleSearch, grantsList);
  }, [titleSearch, grantsList]);

  const getDayDifferenceFromCurrentTime = (expiryDate: Date) => {
    return differenceInDays(expiryDate, new Date());
  };

  const getExpiresInDateText = (expiryDate: Date) => {
    const expiredDays = getDayDifferenceFromCurrentTime(expiryDate);

    return expiredDays > 0
      ? `Expires in ${expiredDays} day${expiredDays > 1 ? 's' : ''}`
      : `Expired ${Math.abs(expiredDays)} day${
          Math.abs(expiredDays) > 1 ? 's' : ''
        } ago`;
  };

  const formatAndFilterGrants = (
    titleSearch: string,
    grantsList: GrantDetails[]
  ) => {
    let finalList: GrantDetails[] = [];

    if (titleSearch.length > 0) {
      finalList = grantsList.filter((grant) => {
        return grant.title.toLowerCase().includes(titleSearch.toLowerCase());
      });
    } else {
      finalList = grantsList;
    }

    const finalListWithExpiry = finalList.map((grant) => {
      return {
        ...grant,
        expiryDateFormatted: getExpiresInDateText(grant.endDate),
      };
    });

    setFilteredGrantsList(finalListWithExpiry);
  };

  const getGrantState = (
    endDate: Date,
    numberOfClaimsMade: number
  ): 'Open' | 'Ended' | 'Pending' => {
    const expiredDays = getDayDifferenceFromCurrentTime(endDate);

    if (expiredDays > 0) {
      return 'Open';
    } else if (expiredDays <= 0 && numberOfClaimsMade > 0) {
      return 'Pending';
    } else {
      return 'Ended';
    }
  };

  const getGrantStateColor = (grantState: 'Open' | 'Ended' | 'Pending') => {
    switch (grantState) {
      case 'Open':
        return ['bg-green-700', 'border-green-800'];
      case 'Ended':
        return ['bg-red-700', 'border-red-800'];
      case 'Pending':
        return ['bg-orange-500', 'border-orange-600'];
    }
  };

  return (
    <div className='w-screen px-14 py-4'>
      <div className='flex justify-between flex-col gap-10 mb-7'>
        <h1 className='text-5xl font-bold'>Grants</h1>
        <div className='flex justify-between'>
          <input
            type='text'
            value={titleSearch}
            placeholder='Search...'
            onChange={(e) => setTitleSearch(e.target.value)}
            className='py-2 border border-gray-300 mt-1 w-3/12 rounded-3xl px-4'
          />
          <Link href='/grants/create'>
            <button className='text-black font-bold py-2 px-4 rounded-3xl border-black border hover:bg-gray-300'>
              Create Grant
            </button>
          </Link>
        </div>
      </div>
      <ul className='flex flex-col gap-4'>
        {filteredGrantsList.map((grant, index) => {
          const grantState = getGrantState(
            grant.endDate,
            grant.numberOfClaimsMade
          );
          const grantStateColorPair = getGrantStateColor(grantState);
          console.log(grant);
          return (
            <Link key={index} href={`/grants/${encodeURIComponent(grant.id)}`}>
              <li className='shadow-sm rounded-3xl px-4 py-2 border hover:shadow-lg hover:border-2 hover:border-black hover:cursor-pointer'>
                <div className='flex flex-col gap-1'>
                  <div className='flex justify-between items-center'>
                    <p className='font-medium text-gray-500'>
                      {grant.expiryDateFormatted}
                    </p>
                    <p
                      className={`border rounded-3xl py-1 px-2 text-sm ${grantStateColorPair[1]} font-bold flex items-center justify-center gap-2`}
                    >
                      <span
                        className={`p-1.5 rounded-full block ${grantStateColorPair[0]}`}
                      ></span>
                      {grantState}
                    </p>
                  </div>
                  <h2 className='text-xl font-bold truncate'>{grant.title}</h2>
                  <p className='text-sm text-gray-600'>{grant.description}</p>
                  <div className='flex justify-between'>
                    <div className='flex gap-4'>
                      <p className='text-md font-semibold'>
                        Goal:{' '}
                        {ethers.utils.formatEther(grant.goalAmount.toString())}{' '}
                        ETH
                      </p>
                      <p className='text-md font-semibold'>
                        Raised:{' '}
                        {ethers.utils.formatEther(
                          grant.totalContributed.toString()
                        )}{' '}
                        ETH
                      </p>
                    </div>
                    <p className='text-black font-bold text-right truncate'>
                      {grant.projectOwner}
                    </p>
                  </div>
                </div>
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
}
