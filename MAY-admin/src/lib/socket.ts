import { io, Socket } from "socket.io-client"

let socketInstance: Socket | null = null

export const getSocket = (): Socket => {
  if (!socketInstance) {
    socketInstance = io("http://localhost:3000", {
      transports: ["websocket"],
      withCredentials: true,
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 10,
    })
    
    socketInstance.on("connect", () => {
      console.log("✅ Socket connected:", socketInstance?.id)
    })
    
    socketInstance.on("disconnect", () => {
      console.log("❌ Socket disconnected")
    })

    socketInstance.on("error", (error) => {
      console.error("⚠️ Socket error:", error)
    })
  }
  return socketInstance
}

export const socket = getSocket()