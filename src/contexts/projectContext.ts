import type { ChainName, Context, Project } from "../types"
import { CHAIN_MAP } from "../constants"
import { createGasSponsoringPolicy, createProject, deleteProject } from "../api"

type ProjectContextPayload = {
    chainName: ChainName,
    teamId: string,
    projectName: string,
}

type ProjectContext = Context<ProjectContextPayload, {
    project: Project,
}>

const beforeEach: ProjectContext['beforeEach'] = (payload) =>  async (context) => {
    const chainId = CHAIN_MAP[payload.chainName]
    context.project = await createProject(payload.teamId, payload.projectName, chainId)
    await createGasSponsoringPolicy(context.project.id)
}

const afterEach: ProjectContext['afterEach'] = () =>  async (context) => {
    await deleteProject(context.project.id)
}

export default {
    beforeEach,
    afterEach
} as ProjectContext