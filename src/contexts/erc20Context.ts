import type { Context, Contract } from "../types"
import { ERC20_MAP, ERC20_ABI } from "../constants"

type ERC20ContextPayload = {
    chainName: keyof typeof ERC20_MAP,
}

type ERC20Context = Context<ERC20ContextPayload, {
    erc20: Contract,
}>

const beforeEach: ERC20Context['beforeEach'] = (payload) =>  async (context) => {
    context.erc20 = {
        address: ERC20_MAP[payload.chainName],
        abi: ERC20_ABI
    }
}

const afterEach: ERC20Context['afterEach'] = () =>  async () => {}

export default {
    beforeEach,
    afterEach
} as ERC20Context