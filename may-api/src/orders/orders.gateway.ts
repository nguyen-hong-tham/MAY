import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: [
      'http://localhost:5173',
      'http://localhost:5174',
      // Client domains
      'https://may-client-snowy.vercel.app',
      'https://may-client-git-main-joppys-projects.vercel.app',
      'https://may-client-bq73o29wg-joppys-projects.vercel.app',
      'https://may-khaki.vercel.app',
      // Admin domains
      'https://may-admin-git-main-joppys-projects.vercel.app',
      'https://may-admin-omvh96yly-joppys-projects.vercel.app',
      'https://may-admin-seven.vercel.app',
    ],
    credentials: true,
  },
})
export class OrdersGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  afterInit(server: Server) {
    server.use((socket, next) => {
      next();
    });
  }

  handleConnection(client: Socket) {
    client.emit('connection', 'Connected to WebSocket server');

    // Send heartbeat every 30 seconds
    const heartbeat = setInterval(() => {
      if (client.connected) {
        client.emit('heartbeat', { timestamp: new Date() });
      } else {
        clearInterval(heartbeat);
      }
    }, 30000);
  }

  handleDisconnect(client: Socket) {}

  @SubscribeMessage('ping')
  handlePing(client: Socket): string {
    return 'pong';
  }

  emitNewOrder(order: any) {
    this.server.emit('new-order', order);
  }

  emitOrderUpdated(order: any) {
    this.server.emit('order-updated', order);
  }
}
