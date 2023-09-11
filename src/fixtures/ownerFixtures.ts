import { test, type TestAPI } from 'vitest'
import { PrivateKeySigner, type SmartAccountSigner } from '@alchemy/aa-core'
  import { generatePrivateKey } from 'viem/accounts'

interface OwnerFixtures {
  privateKeyOwner: SmartAccountSigner
}

export const ownerFixtures: Parameters<typeof test.extend<OwnerFixtures>>[0] = {
  privateKeyOwner: async ({ task }, use) => {
    await use (PrivateKeySigner.privateKeyToAccountSigner(generatePrivateKey()))
  },
}

export const withOwnerFixtures = (environment: TestAPI = test) => environment.extend<OwnerFixtures>(ownerFixtures)