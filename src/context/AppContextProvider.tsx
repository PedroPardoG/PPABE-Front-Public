import React, { createContext, useReducer, Dispatch, ReactNode } from 'react';

// Define the state type
interface AppState {
  value: number;
}

// Define the action types
type AppAction =
  | { type: 'INCREMENT' }
  | { type: 'DECREMENT' };

// Define the reducer function
const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, value: state.value + 1 };
    case 'DECREMENT':
      return { ...state, value: state.value - 1 };
    default:
      return state;
  }
};

// Define the initial state
const initialState: AppState = {
  value: 0,
};

// Create the context
interface AppContextProps {
  state: AppState;
  dispatch: Dispatch<AppAction>;
}

export const AppContext = createContext<AppContextProps | undefined>(undefined);

// Create the context provider component
interface AppContextProviderProps {
  children: ReactNode;
}

export const AppContextProvider: React.FC<AppContextProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
