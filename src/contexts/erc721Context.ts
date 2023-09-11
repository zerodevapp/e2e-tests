import type { Context, Contract } from "../types"
import { ERC721_MAP, ERC721_ABI } from "../constants"

type ERC721ContextPayload = {
    chainName: keyof typeof ERC721_MAP,
}

type ERC721Context = Context<ERC721ContextPayload, {
    erc721: Contract,
}>

const beforeEach: ERC721Context['beforeEach'] = (payload) =>  async (context) => {
    context.erc721 = {
        address: ERC721_MAP[payload.chainName],
        abi: ERC721_ABI
    }
}

const afterEach: ERC721Context['afterEach'] = () =>  async () => {}

export default {
    beforeEach,
    afterEach
} as ERC721Context