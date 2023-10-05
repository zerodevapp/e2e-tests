import axios from 'axios'
import type { Team } from '../types'
import { API_URL } from '../constants'
export async function listTeams() {
    const response = await axios.get(`${API_URL}/teams`)
    return response.data as Team[]
}