// A single task's definition
export interface Task {
  id: string;
  isProcessing: boolean;
  servedBy?: null | Server;
}

// A single Server's definition
export interface Server {
  id: string;
  isIdle: boolean;
  currentTaskHandled: null | Task;
}

// Composition of all necessary data
export type AppState = {
  // "servers" is an object
  // containing a string as key and a Server as value
  servers: Record<string, Server>;
  currentIdleServer: null | Server;
  taskQueue: Task[];
  latestTask: Task | null;
};
