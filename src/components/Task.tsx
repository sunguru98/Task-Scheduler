import React, { useState, useEffect, useRef, useCallback } from "react";
import { useAppContext } from "../AppContext";

import { Task } from "../types/reducer.types";
import Button from "./Button";
import "../styles/Task.scss";

interface TaskProps {
  limit?: number;
  task: Task;
}

const TaskComponent: React.FC<TaskProps> = ({ limit = 20, task }) => {
  // STATE AND INSTANCE VARIABLES
  // -------------------------------------------------------------------------------------
  const { dispatch } = useAppContext();
  const [time, setTime] = useState(limit);
  const timeoutRef = useRef<NodeJS.Timeout>();

  // METHODS
  // -------------------------------------------------------------------------------------
  // 1. Start the progress bar automation
  const startProcessing = useCallback(() => {
    timeoutRef.current = setInterval(() => {
      setTime(pTime => pTime - 1);
    }, 1000);
  }, []);

  // 2. Remove task from taskQueue
  const removeTask = useCallback(() => {
    dispatch({ type: "REMOVE_TASK", payload: { taskId: task.id } });
  }, [dispatch, task.id]);

  // 3. Free up the responsible server from the state
  const freeServer = useCallback(() => {
    dispatch({ type: "FREE_SERVER", payload: { serverId: task.servedBy!.id } });
  }, [dispatch, task.servedBy]);

  // EFFECTS
  // -------------------------------------------------------------------------------------
  useEffect(() => {
    if (task.isProcessing) {
      startProcessing();
    }
  }, [startProcessing, task.isProcessing]);

  // Effect to stop the interval as well as
  // 1. Free the responsible server
  // 2. Remove the task from the queue
  useEffect(() => {
    if (time === 0) {
      clearInterval(timeoutRef.current!);
      removeTask();
      freeServer();
    }
  }, [freeServer, removeTask, time]);

  // RENDER UI
  // -------------------------------------------------------------------------------------
  return (
    <div className="Task__container">
      <div
        className="Task"
        style={{ width: !task.isProcessing ? "80%" : "100%" }}
      >
        <div
          className="Task__progress"
          style={{ width: `${100 - time * (100 / limit)}%` }}
        >
          <span
            style={{ color: time > limit - limit / 20 ? "#8f72b3" : "#fff" }}
          >
            {task.isProcessing
              ? `00:${time < 10 ? `0${time}` : time}`
              : "Waiting ..."}
          </span>
        </div>
      </div>
      {!task.isProcessing && (
        <Button mode="inverted" onClick={removeTask}>
          Remove
        </Button>
      )}
    </div>
  );
};

export default TaskComponent;
