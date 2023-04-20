import { createContext, useRef, useState } from "react"

export const SocketContext = createContext();

export const SocketContextProvider = ({children}) => {
    const socket = useRef();
    const [socketConnected, setSocketConnected] = useState(false);
    return (
        <SocketContext.Provider value={{ socket, socketConnected, setSocketConnected }}>
            {children}
        </SocketContext.Provider>
    )
}