import { useReducer, useContext, createContext } from 'react'

const AuthStateContext = createContext()
const AuthDispatchContext = createContext()

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        token : action.payload.token,
        username: action.payload.username
      }
    case 'LOGOUT':
      return {
        token : action.payload.token,
        username: action.payload.username
      }    
    default:
      throw new Error(`Unknown action: ${action.type}`)
  }
}

const initialState = {
  token: null,
  username: null  
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <AuthDispatchContext.Provider value={dispatch}>
      <AuthStateContext.Provider value={{...state}}>
        {children}
      </AuthStateContext.Provider>
    </AuthDispatchContext.Provider>
  )
}

export const useAuthState = () => useContext(AuthStateContext)
export const useAuthDispatch = () => useContext(AuthDispatchContext)