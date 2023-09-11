import { test, type TestAPI } from 'vitest'
import { createGasSponsoringPolicy, createProject, deleteProject, listProjects } from '../api'
import { CHAIN_MAP, TEAM_ID } from '../constants'
import type { ChainId, ChainName, Project } from '../types'

type ProjectFixtures = {
  [chainName in `${ChainName}Project`]: Project;
}

const createProjectFixture = (chainId: ChainId, name = 'Test Project', teamId = TEAM_ID) => {
  //@ts-expect-error
  return async ({task}, use) => {
    await Promise.all((await listProjects(teamId)).map(deleteProject))
    const project = await createProject(teamId, name, chainId)
    await createGasSponsoringPolicy(project)
    await use(project)
    await Promise.all((await listProjects(teamId)).map(deleteProject))
  }
}

export const projectFixtures: Parameters<typeof test.extend<ProjectFixtures>>[0] = ((Object.fromEntries(Object.entries(CHAIN_MAP).map(([chainName, chainId]) => [`${chainName}Project`, createProjectFixture(chainId as ChainId)]))) as unknown as ProjectFixtures)

export const withProjectFixtures = (environment: TestAPI = test) => environment.extend<ProjectFixtures>(projectFixtures)