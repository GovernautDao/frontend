export interface GrantDetails {
  projectOwner: `0x${string}`;
  id: number;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  expiryDateFormatted?: string;
  goalAmount: BigInt;
  totalContributed: BigInt;
  numberOfClaimsMade: number;
  lastClaimDate: Date;
}
