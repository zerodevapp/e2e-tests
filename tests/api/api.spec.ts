import { createGasSponsoringPolicy, createProject, deleteProject } from "../../src/api"
import { TEAM_ID } from "../../src/constants"
import { Project } from "../../src/types"

describe('API', () => {
    let project: Project
    it('Creates a new Project', async () => {
        project = await createProject(TEAM_ID, 'My Project', '80001')
        expect(project.id).not.toBeNull()
    })

    it('Creates a new Policy', async () => {
        const policy = await createGasSponsoringPolicy(project.id)
        expect(policy.id).not.toBeNull()
    })

    it('deletes a project', async () => {
        expect(await deleteProject(project.id)).toBeTruthy()
    })
})