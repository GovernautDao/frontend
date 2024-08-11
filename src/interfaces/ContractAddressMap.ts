import { Abi } from 'viem';

export interface ContractAddressMap {
  [chainId: number]:
    | {
        address: `0x${string}`;
      }
    | undefined;
  abi: Abi;
}
