import { test, type TestAPI } from "vitest";
import {
  createGasSponsoringPolicy,
  createProject,
  deleteProject,
} from "../api";
import { CHAIN_MAP } from "../constants";
import type { ChainId, ChainName, Project } from "../types";

type ProjectFixtures = {
  [chainName in `${ChainName}Project`]: Project;
};

const createProjectFixture = (chainId: ChainId) => {
  //@ts-expect-error
  return async ({ task, team }, use) => {
    const project = await createProject(team, "Test Project", chainId);
    await createGasSponsoringPolicy(project);
    await use(project);
    await deleteProject(project);
  };
};

export const projectFixtures: Parameters<
  typeof test.extend<ProjectFixtures>
>[0] = Object.fromEntries(
  Object.entries(CHAIN_MAP).map(([chainName, chainId]) => [
    `${chainName}Project`,
    createProjectFixture(chainId as ChainId),
  ])
) as unknown as ProjectFixtures;

export const withProjectFixtures = (environment: TestAPI = test) =>
  environment.extend<ProjectFixtures>(projectFixtures);
