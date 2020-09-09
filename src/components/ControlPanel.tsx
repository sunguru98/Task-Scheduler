import React, { useState, useCallback, ChangeEvent, useMemo } from "react";

import Button from "./Button";
import { useAppContext } from "../AppContext";

const ControlPanel: React.FC = React.memo(() => {
  // STATE AND CONTEXT STATE
  // -------------------------------------------------------------------------------------
  const [taskCount, setTaskCount] = useState(1);
  const {
    state: { servers },
    dispatch
  } = useAppContext();

  // MEMOIZED VALUES (To not repeat computation, unless the respective state changes)
  // -------------------------------------------------------------------------------------
  const serverCount = useMemo(() => Object.keys(servers).length, [servers]);

  // EVENT HANDLER METHODS
  // -------------------------------------------------------------------------------------
  // 1. Change task count
  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setTaskCount(Number(e.target.value));
  }, []);

  // 2. Add a server
  const addServer = useCallback(() => {
    serverCount < 10
      ? dispatch({ type: "ADD_SERVER" })
      : alert("Max 10 servers are allowed");
  }, [dispatch, serverCount]);

  // 3. Remove a server
  const removeServer = useCallback(() => {
    serverCount > 1
      ? dispatch({ type: "REMOVE_SERVER" })
      : alert("Minimum one server should be kept running");
  }, [dispatch, serverCount]);

  // 4. Add 1 - N tasks
  const addTasks = useCallback(() => {
    // Generating a dummy array and looping from there, to save up some time.
    Array.from({ length: taskCount }).forEach(() => {
      dispatch({ type: "LOAD_TASK" });
    });
    setTaskCount(1);
  }, [dispatch, taskCount]);

  // RENDER - UI
  // -------------------------------------------------------------------------------------
  return (
    <div className="ControlPanel">
      <h2>Current available servers: {serverCount}</h2>
      <div className="buttons">
        <Button disabled={serverCount === 10} onClick={addServer}>
          {serverCount === 10 ? "Max 10 servers only" : "Add a server"}
        </Button>
        {serverCount > 0 && (
          <Button
            onClick={removeServer}
            title="Remove a server"
            mode="inverted"
            style={{ marginLeft: "1rem" }}
          >
            Remove a server
          </Button>
        )}
      </div>

      <div className="buttons">
        <input
          type="number"
          min={1}
          name="taskCount"
          value={taskCount}
          onChange={handleChange}
        />
        <Button onClick={addTasks}>Add Tasks</Button>
      </div>
    </div>
  );
});

export default ControlPanel;
