import {
WebSocketGateway,
SubscribeMessage,
MessageBody,
ConnectedSocket,
} from "@nestjs/websockets";
import { Socket } from "socket.io";

import { ChatService } from "./chat.service.js";

@WebSocketGateway({
    cors: true,
    namespace: 'chat'
})
export class ChatGateway{

    constructor(
        private chatService: ChatService
    ){}

    @SubscribeMessage("chat")
    async handleChat(
        @MessageBody()
        message: string,
        @ConnectedSocket() client: Socket
    ){
        const reply = await this.chatService.ask(message);
        client.emit('response', reply);
    }
}