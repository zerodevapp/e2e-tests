import axios from 'axios'
import type { Project } from '../types'
import { API_URL } from '../constants'
export async function listProjects(teamId: string) {
    const response = await axios.get(`${API_URL}/teams/${teamId}/projects`)
    return response.data as Project[]
}