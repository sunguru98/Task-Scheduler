import React, { useEffect } from "react";
import ControlPanel from "./components/ControlPanel";
import { useAppContext } from "./AppContext";
import TaskQueue from "./components/TaskQueue";

const App = () => {
  const { dispatch } = useAppContext();

  // Preparing the system with initiating one server.
  useEffect(() => {
    dispatch({ type: "ADD_SERVER" });
  }, [dispatch]);

  return (
    <div className="App">
      <ControlPanel /> {/** Presence of all controls */}
      <TaskQueue /> {/** The Task queue itself */}
    </div>
  );
};

export default App;
