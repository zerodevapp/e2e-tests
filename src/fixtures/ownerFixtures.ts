import { test, type TestAPI } from 'vitest'
import { PRIVATE_KEY } from '../constants'
import { PrivateKeySigner, type SmartAccountSigner } from '@alchemy/aa-core'

interface OwnerFixtures {
  privateKeyOwner: SmartAccountSigner
}

export const ownerFixtures: Parameters<typeof test.extend<OwnerFixtures>>[0] = {
  privateKeyOwner: async ({ task }, use) => {
    await use (PrivateKeySigner.privateKeyToAccountSigner(PRIVATE_KEY))
  },
}

export const withOwnerFixtures = (environment: TestAPI = test) => environment.extend<OwnerFixtures>(ownerFixtures)