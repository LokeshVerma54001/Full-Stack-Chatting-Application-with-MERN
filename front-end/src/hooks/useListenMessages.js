import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext"
import useConversation from "../zustand/useConversation";
import notificationSound from '../assets/sounds/notification.mp3';

const useListenMessages = () => {
    const {socket} = useSocketContext();
    const {messages, setMessages} = useConversation();
    useEffect(()=>{
        //getting new message from the backend socket io
        socket?.on("newMessage", (newMessage)=>{
            newMessage.shouldShake = true;
            const sound = new Audio(notificationSound);
            sound.play();
            setMessages([...messages, newMessage]);
        })
        //clean up function
        return () =>socket?.off("newMessages");
    }, [socket,setMessages,messages])
}

export default useListenMessages