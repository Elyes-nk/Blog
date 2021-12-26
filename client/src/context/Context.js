import { createContext, useEffect ,useReducer } from "react";
import Reducer from "./Reducer";

const INITIAL_STATE = {
    user:JSON.parse(localStorage.getItem("user")) || null,
    isFetching:false,
    error:false,
};

export const Context = createContext(INITIAL_STATE);
export const ContextProvider = ({children}) => {
    const[state, dispatch] = useReducer(Reducer, INITIAL_STATE);

    // store user on session
    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(state.user))
    }, [state.user])

    return(
        <Context.Provider
            value={{
                user:state.user,
                isFetching:state.isFetching,
                error:state.error,
                //response from server
                dispatch
            }}
        >
            {children}
        </Context.Provider>
    )
}
export default ContextProvider;