import axios from "axios";
import { API_URL } from "../constants";
import type { Project } from "../types";

export async function deleteProject(project: Project) {
  const response = await axios.delete(`${API_URL}/projects/${project.id}`);
  return response.status < 300;
}
