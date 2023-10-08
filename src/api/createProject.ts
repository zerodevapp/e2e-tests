import axios from "axios";
import type { ChainId, Project, Team } from "../types";
import { API_URL } from "../constants";
export async function createProject(
  team: Pick<Team, "id">,
  name: string,
  chainId: ChainId
) {
  const response = await axios.post(`${API_URL}/teams/${team.id}/projects`, {
    name,
    chainId,
  });
  return response.data as Project;
}
