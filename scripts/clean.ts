import dotenv from "dotenv";
import axios from "axios";

import {
  deleteProject,
  deleteTeam,
  listProjects,
  listTeams,
} from "../src/api/index";

dotenv.config();
axios.interceptors.request.use(
  function (config) {
    config.headers["X-API-KEY"] = process.env.API_KEY;
    config.headers["Accept"] = "application/json";
    config.headers["Content-Type"] = "application/json";
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

const teams = await listTeams();

await Promise.all(
  teams.map(async (team) => {
    const projects = await listProjects(team);
    await Promise.all(projects.map(deleteProject));
    await deleteTeam(team);
  }),
);
