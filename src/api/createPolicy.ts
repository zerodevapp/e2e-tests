import axios from "axios";
import type { Policy, Project } from "../types";
import { API_URL } from "../constants";
export async function createPolicy(
  project: Project,
  policyGroup: Policy["policyGroup"],
  strategy: Policy["strategy"] = "pay_for_user"
) {
  const response = await axios.post(
    `${API_URL}/projects/${project.id}/policies`,
    {
      policyGroup,
      strategy,
    }
  );
  return response.data as Policy[];
}

export async function createGasSponsoringPolicy(project: Project) {
  return createPolicy(project, "project");
}
