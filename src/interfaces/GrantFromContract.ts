export interface GrantContractResultArgs {
  projectOwner: `0x${string}`;
  startTimestamp: BigInt;
  endTimestamp: BigInt;
  goalAmount: BigInt;
  totalContributed: BigInt;
  numberOfClaimsMade: BigInt;
  lastClaimTimestamp: BigInt;
}

export interface GrantFromContract {
  result: GrantContractResultArgs;
  // TODO: figure out what the error type actually is
  status: 'success' | 'error';
}
