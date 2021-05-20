import React from "react";
import socketio from "socket.io-client";
const PORT = 3002;
// export const socket = io.connect(`http://127.0.0.1:${PORT}`);
export const socket = socketio.connect(`http://127.0.0.1:${PORT}`);
export const SocketContext = React.createContext();
