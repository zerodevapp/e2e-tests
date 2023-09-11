import type { ChainName, Context, Project } from "../types"
import { CHAIN_MAP } from "../constants"
import { createGasSponsoringPolicy, createProject, deleteProject, listProjects } from "../api"

type ProjectContextPayload = {
    chainName: ChainName,
    teamId: string,
    projectName: string,
}

type ProjectContext = Context<ProjectContextPayload, {
    project: Project,
}>

const beforeEach: ProjectContext['beforeEach'] = (payload) =>  async (context) => {
    await Promise.all((await listProjects(payload.teamId)).map(deleteProject))
    const chainId = CHAIN_MAP[payload.chainName]
    context.project = await createProject(payload.teamId, payload.projectName, chainId)
    await createGasSponsoringPolicy(context.project)
}

const afterEach: ProjectContext['afterEach'] = (payload) =>  async () => {
    const projects = await listProjects(payload.teamId)
    await Promise.all(projects.map(deleteProject))
}

export default {
    beforeEach,
    afterEach
} as ProjectContext