import type { Hex } from "viem"

export const API_URL = process.env.API_URL!
export const API_KEY = process.env.API_KEY!
export const TEAM_ID = process.env.TEAM_ID!
export const PRIVATE_KEY = process.env.PRIVATE_KEY! as Hex

export const TESTNET_CHAINS = ['5', '420', '421613', '43113', '80001', '84531', '10200'] as const
export const MAINNET_CHAINS = ['1', '10', '137', '42161', '43114', '56', '8453', '100'] as const
export const CHAINS = [...TESTNET_CHAINS, ...MAINNET_CHAINS] as const
