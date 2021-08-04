import { useAnimation } from "framer-motion";
import React, {createContext, useReducer} from "react";
import Reducer from './Reducer'


const initialState = {
    route:'',
    slide:undefined,
};

const Store = ({children}:{children:any}) => {
    const [state, dispatch] = useReducer(Reducer, initialState);
    return (
        <Context.Provider value={[state, dispatch] as any}>
            {children}
        </Context.Provider>
    )
};

export const Context = createContext(initialState);
export default Store;