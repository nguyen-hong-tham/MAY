// import { io, Socket } from "socket.io-client";
// import { API_BASE_URL } from "./api";
import { Socket } from "socket.io-client";

let socketInstance: Socket | null = null;

export const getSocket = (): Socket => {
  if (!socketInstance) {
    // DISABLED: Backend doesn't have default namespace handler
    // Use namespace-specific connections instead
    // socketInstance = io(API_BASE_URL, {
    //   transports: ["websocket"],
    //   withCredentials: true,
    //   reconnection: true,
    //   reconnectionDelay: 1000,
    //   reconnectionDelayMax: 5000,
    //   reconnectionAttempts: 10,
    // });

    throw new Error("getSocket() is disabled. Use namespace-specific connections instead.");
  }

  return socketInstance;
};
