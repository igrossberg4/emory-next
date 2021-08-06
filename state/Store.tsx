import { useAnimation } from "framer-motion";
import React, {createContext, useReducer} from "react";
import Reducer from './Reducer'

export interface IVideoController{
    paused:boolean;
    muted:boolean;
    videoRef:HTMLVideoElement;
    skipped:boolean;
}
export interface IStore{
    videoStore:{ [key: string]: IVideoController; };
    route:string;
}


const initialState = {
    route:'',
    videoStore:{}
}

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