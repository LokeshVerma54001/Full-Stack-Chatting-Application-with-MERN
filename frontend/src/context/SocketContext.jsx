import { createContext, useEffect, useState, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = ()=>{
    return useContext(SocketContext);
}

export const SocketContextProvider = ({children})=>{
    
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const {authUser} = useAuthContext();
    useEffect(()=>{
        if(authUser){
            const socket = io("https://full-stack-chatting-application-with-mern.onrender.com", {
                query:{
                    userId:authUser._id
                }
            });
            setSocket(socket);
            //getting users map from backend socket io server
            socket.on("getOnlineUsers", (users)=>{
                setOnlineUsers(users);
            })
            //cleanup function to save resources
            return () => socket.close();
        }else{
            if(socket){
                socket.close();
                setSocket(null);
            }
        }
    }, [authUser])
    return (
        <SocketContext.Provider value={{socket,onlineUsers}}>
            {children}
        </SocketContext.Provider>
    )
}