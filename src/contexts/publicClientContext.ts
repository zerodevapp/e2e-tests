import type { ChainName, Context } from "../types"
import { CHAIN_MAP, CHAIN_NODE_MAP } from "../constants"
import { createPublicClient, http, type PublicClient } from "viem"
import * as chains from 'viem/chains'

type PublicClientContextPayload = {
    chainName: ChainName,
}
type PublicClientContext = Context<PublicClientContextPayload, {
    publicClient: PublicClient,
}>


const beforeEach: PublicClientContext['beforeEach'] = (payload) =>  async (context) => {
    const chainId = CHAIN_MAP[payload.chainName]
    context.publicClient = createPublicClient({ 
        chain: (Object.values(chains)).find(chain => chain.id === parseInt(chainId)) as chains.Chain,
        transport: http(CHAIN_NODE_MAP[payload.chainName])
    })
}

const afterEach: PublicClientContext['afterEach'] = () =>  async () => {}

export default {
    beforeEach,
    afterEach
} as PublicClientContext