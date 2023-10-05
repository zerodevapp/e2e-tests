import axios from 'axios'
import { API_URL } from '../constants'
import type { Team } from '../types'
export async function createTeam(name: string) {
    const response = await axios.post(`${API_URL}/teams`, {
        name,
    })
    return response.data as Team
}