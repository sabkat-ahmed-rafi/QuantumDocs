import { io } from "socket.io-client";

const socket = io(`${process.env.NEXT_PUBLIC_communication_service}`, {
    autoConnect: false, // Prevents automatic connection
});

// Export the socket instance
export default socket;
