import axios from 'axios'
import { API_URL } from '../constants'
import type { Team } from '../types'

export async function deleteTeam(team: Team) {
    const response = await axios.delete(`${API_URL}/teams/${team.id}`)
    return response.status < 300
}