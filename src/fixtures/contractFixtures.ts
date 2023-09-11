import { test, type TestAPI } from 'vitest'
import { ERC20_ABI, ERC20_MAP, ERC721_ABI, ERC721_MAP } from '../constants'
import type { Contract } from '../types'

type ContractFixtures = {
  [chainName in `${keyof typeof ERC721_MAP}ERC721`]: Contract
} & {
  [chainName in `${keyof typeof ERC20_MAP}ERC20`]: Contract
}

export const contractFixtures: Parameters<typeof test.extend<ContractFixtures>>[0] = {
  ...Object.fromEntries(Object.entries(ERC721_MAP).map(([chainName, address]) => 
      [`${chainName}ERC721`, { address, abi: ERC721_ABI}]
  )),
  ...Object.fromEntries(Object.entries(ERC20_MAP).map(([chainName, address]) => 
      [`${chainName}ERC20`, { address, abi: ERC20_ABI}]
  ))
} as unknown as ContractFixtures

export const withContractFixtures = (environment: TestAPI = test) => environment.extend<ContractFixtures>(contractFixtures)