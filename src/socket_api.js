import io from "socket.io-client";

const PORT = 3002;
export const socket = io.connect(`http://127.0.0.1:${PORT}`);
