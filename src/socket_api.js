import React from "react";
import socketio from "socket.io-client";
import { api } from "./api";

const PORT = 3002;
export const socket = socketio.connect(`http://${api.host}:${api.port}`);
// export const socket = socketio.connect(`http://172.28.1.88:${PORT}`);
export const SocketContext = React.createContext();
