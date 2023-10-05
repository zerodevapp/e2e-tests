import { erc20Gas } from "../../src/tests";
import { CHAIN_MAP, CHAIN_NODE_MAP, ERC20_ABI, ERC20_MAP, PROVIDERS } from "../../src/constants";
import { createGasSponsoringPolicy, createProject, deleteProject } from "../../src/api";
import { ownerFixtures } from "../../src/fixtures/ownerFixtures";
import { createPublicClient, http } from "viem";
import * as viemChains from 'viem/chains'
import { teamFixtures } from "../../src/fixtures/teamFixtures";


// All ERC20 Test Chains
const chains = Object.keys(ERC20_MAP) as Array<keyof typeof ERC20_MAP>

// // Not working
const chainsToSkip = ['arbitrumGoerli', 'optimismGoerli', 'avalancheFuji', 'baseGoerli']

// runs test for each chain
describe.sequential('erc20Gas', () => {
    for (let chain of chains) {
        if (chainsToSkip.includes(chain)) continue
        it.extend(ownerFixtures).extend(teamFixtures).concurrent(
            chain,
            async ({privateKeyOwner: owner, team, expect}) => {
                const chainId = CHAIN_MAP[chain]
                const project = await createProject(team, 'TestProject', chainId)
                await createGasSponsoringPolicy(project)
                const publicClient = createPublicClient({ 
                    chain: (Object.values(viemChains)).find(chain => chain.id === parseInt(chainId)) as viemChains.Chain,
                    transport: http(CHAIN_NODE_MAP[chain])
                })
                const erc20 = {
                    address: ERC20_MAP[chain],
                    abi: ERC20_ABI
                }
                await erc20Gas({project, owner, publicClient, erc20 }, expect),
                await deleteProject(project)
            },
            240000
        )
    }
})
