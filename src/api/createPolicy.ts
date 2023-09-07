import axios from 'axios'
import type { Policy } from '../types'
import { API_URL } from '../constants'
export async function createPolicy(
    projectId: string, 
    policyGroup: Policy['policyGroup'], 
    strategy: Policy['strategy'] = 'pay_for_user',
) {
    const response = await axios.post(`${API_URL}/projects/${projectId}/policies`, {
        policyGroup,
        strategy
    })
    return response.data as Policy[]
}

export async function createGasSponsoringPolicy(projectId: string) {
    return createPolicy(projectId, 'project')
}