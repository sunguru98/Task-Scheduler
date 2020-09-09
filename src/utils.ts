import { Server } from "./types/reducer.types";

// HELPER METHOD
// Calculates the recent idle server by finding the idle property of a server.
export const calculateIdleServer = (
  servers: Record<string, Server>,
  blackListedServerId: string = ""
): Server | null => {
  const serverId = Object.keys(servers).find(
    s =>
      s !== blackListedServerId &&
      servers[s].isIdle &&
      !servers[s].currentTaskHandled
  );
  return serverId ? servers[serverId] : null;
};
