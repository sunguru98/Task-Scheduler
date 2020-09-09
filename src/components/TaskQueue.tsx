import React, { useEffect, useCallback } from "react";
import { useAppContext } from "../AppContext";

import TaskComponent from "./Task";

import { Task } from "../types/reducer.types";
import "../styles/TaskQueue.scss";

const TaskQueue: React.FC = React.memo(() => {
  // CONTEXT STATE
  // -------------------------------------------------------------------------------------
  const {
    state: { taskQueue, latestTask, currentIdleServer },
    dispatch
  } = useAppContext();

  // METHODS
  // -------------------------------------------------------------------------------------
  // 1. Assigns a particular task with a server and vice versa. (Bi-directional)
  const assignTaskAndServer = useCallback(
    (task?: Task) => {
      if (task?.isProcessing === false && currentIdleServer) {
        dispatch({
          type: "ASSIGN_SERVER",
          payload: { taskId: task.id, server: currentIdleServer }
        });

        dispatch({
          type: "ASSIGN_TASK",
          payload: { serverId: currentIdleServer.id, task: task }
        });
      }
    },
    [currentIdleServer, dispatch]
  );

  // EFFECTS
  // -------------------------------------------------------------------------------------
  // Effect handler for new task additions.
  useEffect(() => {
    latestTask && assignTaskAndServer(latestTask);
  }, [assignTaskAndServer, latestTask]);

  // Checks if a server is idle as well as any idle task that needs to be done
  // If yes, then we match up the idle server with the idle task.
  useEffect(() => {
    if (currentIdleServer) {
      const newTask = taskQueue.find(t => !t.isProcessing);
      assignTaskAndServer(newTask);
    }
  }, [assignTaskAndServer, currentIdleServer, taskQueue]);

  // RENDER - UI
  // -------------------------------------------------------------------------------------
  return (
    <div className="TaskQueue">
      {taskQueue.length ? (
        taskQueue.map(task => <TaskComponent key={task.id} task={task} />)
      ) : (
        <span>No tasks running at the moment.</span>
      )}
    </div>
  );
});

export default TaskQueue;
