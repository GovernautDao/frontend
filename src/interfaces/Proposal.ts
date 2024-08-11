export interface Proposal {
  id?: number;
  expiryDate?: string;
  expiryDateFormatted?: string;
  title?: string;
  submittedBy?: string;
  
  proposalId: string;
  description: string;
  proposer: string;
  blockNumber: number;
  transactionHash: string;
}
