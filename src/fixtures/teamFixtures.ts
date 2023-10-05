import { test, type TestAPI } from 'vitest'
import { createTeam, deleteProject, deleteTeam, listProjects } from '../api'
import type { Team } from '../types'

type TeamFixtures = {
  team: Team;
}

export const teamFixtures: Parameters<typeof test.extend<TeamFixtures>>[0] = {
  team: async ({task}, use) => {
    const team = await createTeam('E2E Team')
    await use(team)
    await Promise.all((await listProjects(team)).map(deleteProject))
    await deleteTeam(team)
  }
}

export const withTeamFixtures = (environment: TestAPI = test) => environment.extend<TeamFixtures>(teamFixtures)
