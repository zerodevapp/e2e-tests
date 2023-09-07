import axios from 'axios'
import type { Chain, Project } from '../types'
import { API_URL } from '../constants'
export async function createProject(teamId: string, name: string, chainId: Chain) {
    const response = await axios.post(`${API_URL}/teams/${teamId}/projects`, {
        name,
        chainId
    })
    return response.data as Project
}