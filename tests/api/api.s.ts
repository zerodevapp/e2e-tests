import { createGasSponsoringPolicy, createProject, createTeam, deleteProject, deleteTeam } from "../../src/api"
import type { Project, Team } from "../../src/types"

describe.sequential('API', () => {
    let team: Team
    let project: Project

    it('creates a team', async () => {
        team = await createTeam('E2E - TESTING')
        expect(team.id).not.toBeNull()
    })

    it('creates a project', async () => {
        project = await createProject(team, 'My Project', '80001')
        expect(project.id).not.toBeNull()
    })

    it('creates a policy', async () => {
        const policies = await createGasSponsoringPolicy(project)
        expect(policies.length).toBeGreaterThan(0)
    })

    it('deletes a project', async () => {
        expect(await deleteProject(project)).toBeTruthy()
    })

    it('deletes a team', async () => {
        expect(await deleteTeam(team)).toBeTruthy()
    })
})