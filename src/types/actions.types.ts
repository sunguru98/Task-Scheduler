import { Task, Server } from "./reducer.types";

// SERVER RELATED ACTIONS
// ---------------------------------------------------------------------------------------
// 1. Adds a server to the context state
interface AddServerAction {
  type: "ADD_SERVER";
}

// 2. Removes a server to the context state
interface RemoveServerAction {
  type: "REMOVE_SERVER";
}

// 3. Assign's a task to a server.
// Accepts a serverId and the task itself.
interface AssignTaskAction {
  type: "ASSIGN_TASK";
  payload: {
    serverId: string;
    task: Task;
  };
}

// 4. Free up resources for the server to perform the next task.
// Accepts a serverId alone.
interface FreeUpServerAction {
  type: "FREE_SERVER";
  payload: {
    serverId: string;
  };
}

// TASK RELATED ACTIONS
//----------------------------------------------------------------------------------------

// 1. Create a new task.
interface LoadTaskAction {
  type: "LOAD_TASK";
}

// 2. Assigns a server to a task.
// Accepts a taskId and the server itself.
interface AssignServerAction {
  type: "ASSIGN_SERVER";
  payload: {
    taskId: string;
    server: Server;
  };
}

// 3. Remove a task from the taskQueue.
// Accepts a taskId
interface RemoveTaskAction {
  type: "REMOVE_TASK";
  payload: {
    taskId: string;
  };
}

// Composite of all actions
// ---------------------------------------------------------------------------------------
export type AppActions =
  | AddServerAction
  | RemoveServerAction
  | AssignTaskAction
  | AssignServerAction
  | LoadTaskAction
  | RemoveTaskAction
  | FreeUpServerAction;
