export interface ContributionStatusResultArgs {
  amountContributed: bigint;
}

export interface ContributionStatusFromContract {
  result: ContributionStatusResultArgs;
  // TODO: figure out what the error type actually is
  status: 'success' | 'error';
}
