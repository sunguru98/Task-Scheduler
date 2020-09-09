import { v4 as uuid } from "uuid";
import { AppState, Server } from "./types/reducer.types";
import { AppActions } from "./types/actions.types";
import { calculateIdleServer } from "./utils";

// INITIAL STATE
// ---------------------------------------------------------------------------------------
export const initialState: AppState = {
  servers: {},
  latestTask: null,
  taskQueue: [],
  currentIdleServer: null
};

// REDUCER
// ------------------------------------------------------------------------------------------
export default (state: AppState, action: AppActions): AppState => {
  switch (action.type) {
    // Adds a new server by creating a new id, and adding as a new record.
    case "ADD_SERVER": {
      const serverId = uuid();
      const newServer = {
        id: serverId,
        isIdle: true,
        currentTaskHandled: null
      };
      return {
        ...state,
        servers: {
          ...state.servers,
          [serverId]: newServer
        },
        currentIdleServer: newServer
      } as AppState;
    }

    // Removes a server by deleting a property in the record,
    // Provided the server is idle.
    case "REMOVE_SERVER": {
      const cloneServers = { ...state.servers };
      for (let serverId in cloneServers) {
        if (cloneServers[serverId].isIdle) {
          delete cloneServers[serverId];
          return {
            ...state,
            servers: cloneServers,
            currentIdleServer: calculateIdleServer(cloneServers)
          };
        }
      }
      alert("All servers are busy. Kindly wait for some time");
      return state;
    }

    // Assigns a server to a task
    // and also making sure to update the new idle server (if any).
    case "ASSIGN_SERVER": {
      const { taskId, server } = action.payload;
      const taskQueueDup = [...state.taskQueue];

      const task = taskQueueDup.find(t => t.id === taskId)!;
      task.servedBy = server;
      task.isProcessing = true;

      return {
        ...state,
        taskQueue: [...taskQueueDup],
        currentIdleServer: calculateIdleServer({ ...state.servers }, server.id)
      };
    }

    // Freeing up a server by unbinding the connections the current server had
    // and also recalculating the current idle server
    case "FREE_SERVER": {
      const { serverId } = action.payload;

      const upcomingFreeServer = {
        ...state.servers[serverId],
        currentTaskHandled: null,
        isIdle: true
      };

      return {
        ...state,
        servers: {
          ...state.servers,
          [serverId]: upcomingFreeServer
        },
        currentIdleServer: upcomingFreeServer
      };
    }

    // Creates a new task, and also conditionally setting the latestTask,
    // If the task queue's length is empty, or just leaving as such.
    case "LOAD_TASK": {
      const newTask = { id: uuid(), isProcessing: false, servedBy: null };
      return {
        ...state,
        taskQueue: [...state.taskQueue, newTask],
        latestTask: state.taskQueue.length < 1 ? newTask : state.latestTask
      };
    }

    // Assigns a task to a server. Pretty straight forward
    case "ASSIGN_TASK": {
      const {
        payload: { serverId, task }
      } = action;

      const assignedServer: Server = {
        id: serverId,
        currentTaskHandled: task,
        isIdle: false
      };

      return {
        ...state,
        servers: {
          ...state.servers,
          [serverId]: assignedServer
        }
      };
    }

    // Remove's a task by unbinding the connecting with the server and also
    // setting the latestTask as the queue's 0th index if queue is not empty.
    case "REMOVE_TASK": {
      const newTaskQueue = state.taskQueue.filter(
        t => t.id !== action.payload.taskId
      );
      return {
        ...state,
        taskQueue: newTaskQueue,
        latestTask: newTaskQueue[0] || null
      };
    }

    default:
      return state;
  }
};
