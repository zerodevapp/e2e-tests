import axios from 'axios'
import { API_URL } from '../constants'

export async function deleteProject(projectId: string) {
    const response = await axios.delete(`${API_URL}/projects/${projectId}`)
    return response.status < 300
}