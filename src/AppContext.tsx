import React, { useReducer, useContext } from "react";
import reducer, { initialState } from "./reducer";

// Types
import { AppState } from "./types/reducer.types";
import { AppActions } from "./types/actions.types";

// CONTEXT DEFINITION - REDUX LITE
// ------------------------------------------------------------------------------------
const AppContext = React.createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppActions>;
}>({ state: initialState, dispatch: () => {} });

// Custom hook to get all the state
export const useAppContext = () => {
  return useContext(AppContext);
};
// ------------------------------------------------------------------------------------

// Provider component to hook up with index (Just like react-redux Provider)
// ------------------------------------------------------------------------------------
const AppContextProvider: React.FC = ({ children }) => {
  // Getting state and dispatch function from the reducer file ("./reducer.ts")
  const [state, dispatch] = useReducer(reducer, initialState);

  // RENDER-UI
  // ------------------------------------------------------------------------------------
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
