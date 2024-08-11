import { GrantFromContract } from '@/interfaces/GrantFromContract';
import { ethers } from 'ethers';

export const grantsFromContract: GrantFromContract[] = [
  // ongoing grant example (submitted by current user)
  {
    result: {
      projectOwner: '0x01e838C20d92F375B0FB8833e5DbC0b7E1b24E30',
      startTimestamp: BigInt(1720682238), // 	Thu Jul 11 2024 07:17:18 GMT+0000
      endTimestamp: BigInt(1724397438), // 	Fri Aug 23 2024 07:17:18 GMT+0000,
      goalAmount: ethers.utils.parseUnits('5', 18).toBigInt(), // 5 ETH
      totalContributed: ethers.utils.parseUnits('1', 18).toBigInt(), // 1 ETH
      numberOfClaimsMade: BigInt(0),
      lastClaimTimestamp: BigInt(0), // cant make claim cause not completed
    },
    status: 'success',
  },
  // expired grant that raised full amount and fully claimed (submitted by other user)
  {
    result: {
      projectOwner: '0x01e838C20d92F375B0FB8833e5DbC0b7E1b24E31',
      startTimestamp: BigInt(1714536000), // Wed May 01 2024 04:00:00 GMT+0000,
      endTimestamp: BigInt(1717214400), // Sat Jun 01 2024 04:00:00 GMT+0000
      goalAmount: ethers.utils.parseUnits('1', 18).toBigInt(), // 1 ETH
      totalContributed: ethers.utils.parseUnits('1', 18).toBigInt(), // 1 ETH
      numberOfClaimsMade: BigInt(4),
      lastClaimTimestamp: BigInt(1722398400), // Wed Jul 31 2024 04:00:00 GMT+0000
    },
    status: 'success',
  },
  // expired grant that did not raise full amount (submitted by other user but we contributed so we can claim)
  {
    result: {
      projectOwner: '0x01e838C20d92F375B0FB8833e5DbC0b7E1b24E31',
      startTimestamp: BigInt(1709614800), // Tue Mar 05 2024 05:00:00 GMT+0000,
      endTimestamp: BigInt(1712289600), // Fri Apr 05 2024 04:00:00 GMT+0000
      goalAmount: ethers.utils.parseUnits('16', 18).toBigInt(), // 16 ETH
      totalContributed: ethers.utils.parseUnits('5', 18).toBigInt(), // 5 ETH
      numberOfClaimsMade: BigInt(0),
      lastClaimTimestamp: BigInt(0),
    },
    status: 'success',
  },
  // expired grant that raise full amount but only been partially claimed (submitted by current user)
  {
    result: {
      projectOwner: '0x01e838C20d92F375B0FB8833e5DbC0b7E1b24E30',
      startTimestamp: BigInt(1720584000), // Wed Jul 10 2024 04:00:00 GMT+0000
      endTimestamp: BigInt(1722830400), // Mon Aug 05 2024 04:00:00 GMT+0000,
      goalAmount: ethers.utils.parseUnits('2.5', 18).toBigInt(), // 2.5 ETH
      totalContributed: ethers.utils.parseUnits('2.5', 18).toBigInt(), // 2.5 ETH,
      numberOfClaimsMade: BigInt(1),
      lastClaimTimestamp: BigInt(1722916800), // Tue Aug 06 2024 04:00:00 GMT+0000
    },
    status: 'success',
  },
  // ongoing grant made by other user that we can contribute to
  {
    result: {
      projectOwner: '0x01e838C20d92F375B0FB8833e5DbC0b7E1b24E31',
      startTimestamp: BigInt(1722484800), // Thu Aug 01 2024 04:00:00 GMT+0000
      endTimestamp: BigInt(1725163200), // Sun Sep 01 2024 04:00:00 GMT+0000,
      goalAmount: ethers.utils.parseUnits('10', 18).toBigInt(), // 10 ETH
      totalContributed: ethers.utils.parseUnits('1', 18).toBigInt(), // 1 ETH,
      numberOfClaimsMade: BigInt(0),
      lastClaimTimestamp: BigInt(0),
    },
    status: 'success',
  },
];

export const proposalData: { title: string; description: string }[] = [
  // ongoing grant example (submitted by current user)
  {
    title: 'Ongoing Grant',
    description: 'This is an ongoing grant that has not yet expired',
  },
  // expired grant that raised full amount and fully claimed (submitted by other user)
  {
    title: 'Expired Grant (Raised Full Amount & Fully Claimed)',
    description: 'This grant has expired and has been fully claimed',
  },
  // expired grant that did not raise full amount (submitted by other user but we contributed so we can claim)
  {
    title: 'Expired Grant (Did Not Raise Full Amount)',
    description: 'This grant has expired and did not raise the full amount',
  },
  // expired grant that raise full amount but only been partially claimed (submitted by current user)
  {
    title: 'Expired Grant (Raised Full Amount & Partially Claimed)',
    description: 'This grant has expired and has been partially claimed',
  },
  // ongoing grant made by other user that we can contribute to
  {
    title: 'Ongoing Grant (Can Contribute)',
    description: 'This grant is ongoing and you can contribute to it',
  },
];
