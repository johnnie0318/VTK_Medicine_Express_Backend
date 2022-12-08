import { isPostBuild } from "./config.json";

export const pathConfiger = (path) => (isPostBuild ? `/react${path}` : path);
