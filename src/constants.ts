import { TEST_ERC20Abi } from "@zerodev/sdk"
import { parseAbi } from "viem"

export const API_URL = process.env.API_URL!
export const API_KEY = process.env.API_KEY!
export const TEAM_ID = process.env.TEAM_ID!

export const TESTNET_CHAIN_IDS = ['5', '420', '421613', '43113', '80001', '84531', '10200'] as const
export const MAINNET_CHAINS_IDS = ['1', '10', '137', '42161', '43114', '56', '8453', '100'] as const
export const CHAIN_IDS = [...TESTNET_CHAIN_IDS, ...MAINNET_CHAINS_IDS] as const

export const CHAIN_MAP = {
    'mainnet': '1',
    'goerli': '5',
    'polygon': '137',
    'polygonMumbai': '80001',
    'arbitrum': '42161',
    'arbitrumGoerli': '421613',
    'optimism': '10',
    'optimismGoerli': '420',
    'avalanche': '43114',
    'avalancheFuji': '43113',
    'base': '8453',
    'baseGoerli': '84531',
    'gnosis': '100',
    'gnosisChiado': '10200',
    'bsc': '56',
} as const

export const INFURA_API_KEY = "f36f7f706a58477884ce6fe89165666c";
export const CHAIN_NODE_MAP = {
  'mainnet': `https://mainnet.infura.io/v3/${INFURA_API_KEY}`,
  'goerli': `https://goerli.infura.io/v3/${INFURA_API_KEY}`,
  'polygon': `https://polygon-mainnet.infura.io/v3/${INFURA_API_KEY}`,
  'polygonMumbai': `https://polygon-mumbai.infura.io/v3/${INFURA_API_KEY}`,
  'arbitrum': `https://arbitrum-mainnet.infura.io/v3/${INFURA_API_KEY}`,
  'arbitrumGoerli': `https://arbitrum-goerli.infura.io/v3/${INFURA_API_KEY}`,
  'optimism': `https://optimism-mainnet.infura.io/v3/${INFURA_API_KEY}`,
  'optimismGoerli': `https://optimism-goerli.infura.io/v3/${INFURA_API_KEY}`,
  'avalanche': `https://avalanche-fuji.infura.io/v3/${INFURA_API_KEY}`,
  'avalancheFuji': `https://avalanche-mainnet.infura.io/v3/${INFURA_API_KEY}`,
  'base': "https://twilight-red-tree.base-mainnet.quiknode.pro/dc6eb27bf0f917df215922488dd97f4de7d9b08e/",
  'baseGoerli':
    "https://icy-long-mountain.base-goerli.quiknode.pro/5b80d93e97cc9412a63c10a30841869abbef9596/",
  'gnosis': "https://thrilling-fluent-film.xdai.quiknode.pro/305955cffb9868cdd95b5e3dc9775f20678ad9ac/",
  'gnosisChiado': "https://nd-810-853-201.p2pify.com/e828b09f0d43591de96c297b3f36fffd",
  'bsc': "https://neat-greatest-layer.bsc.quiknode.pro/9405a499ceee314e5f2f68c9d47518d3537fce6a/"
} as const;

export const ERC721_MAP = {
    'goerli': '0xca171d43b2f5e5c1a071d3dba8354ef0e2df4816',
    'polygon': '0x34bE7f35132E97915633BC1fc020364EA5134863',
    'polygonMumbai': '0x34bE7f35132E97915633BC1fc020364EA5134863',
    'arbitrum': '0x34bE7f35132E97915633BC1fc020364EA5134863',
    'gnosis': '0xfEe13462D096C2B9205C8B0C3B985bD4693e08B1',
    'gnosisChiado': '0xfEe13462D096C2B9205C8B0C3B985bD4693e08B1',
    'bsc': '0xfEe13462D096C2B9205C8B0C3B985bD4693e08B1'
}  as const

export const ERC721_ABI = parseAbi([
    'function mint(address _to) public',
    'function balanceOf(address owner) external view returns (uint256 balance)'
])

export const ERC20_MAP = {
    'goerli': '0x3870419Ba2BBf0127060bCB37f69A1b1C090992B',
    'polygonMumbai': '0x3870419Ba2BBf0127060bCB37f69A1b1C090992B',
    'arbitrumGoerli': '0x3870419Ba2BBf0127060bCB37f69A1b1C090992B',
    'optimismGoerli': '0x3870419Ba2BBf0127060bCB37f69A1b1C090992B',
    'avalancheFuji': '0x3870419Ba2BBf0127060bCB37f69A1b1C090992B',
    'baseGoerli': '0x3870419Ba2BBf0127060bCB37f69A1b1C090992B'
}  as const

export const ERC20_ABI = TEST_ERC20Abi

export const PROVIDERS = ['ALCHEMY', /*'PIMLICO',*/ 'STACKUP'] as const