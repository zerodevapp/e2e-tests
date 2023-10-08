import axios from "axios";
import type { Project, Team } from "../types";
import { API_URL } from "../constants";
export async function listProjects(team: Team) {
  const response = await axios.get(`${API_URL}/teams/${team.id}/projects`);
  return response.data as Project[];
}
