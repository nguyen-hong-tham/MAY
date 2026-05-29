import { Module } from "@nestjs/common";
import { ChatGateway } from "./chat.gateway.js";
import { ChatService } from "./chat.service.js";
import { PrismaService } from "../prisma/prisma.service.js";

@Module({
    providers:[
        ChatGateway,
        ChatService,
        PrismaService
    ]
})
export class ChatModule{}