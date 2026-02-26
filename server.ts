import "reflect-metadata";
import express from "express";
import cors from "cors";
import { InversifyExpressServer } from "inversify-express-utils";
import { container } from "./src/shared/container.js";
import { Server } from "socket.io"
import { bidsSocketHandler } from "./src/bids/infrastructure/handlers/EmitBidSocket_handler.js";
import { createServer } from "http";
import { TYPES } from "./src/shared/types.js";

async function bootstrap() {
    const server = new InversifyExpressServer(container);

    server.setConfig((app) => {
        app.use(cors({ origin: "*" }));
        app.use(express.json());
    });

    const app = server.build();

    const httpServer = createServer(app)

    const io = new Server (httpServer, {
        "cors": { "origin": "*" },
    });

    container.bind<Server>(TYPES.SocketIO).toConstantValue(io);

    io.on("connection", (socket: any) => {

        console.log("Usuario conectado:", socket.id);

        socket.on("join_auction", (auction_id: number) => {
            socket.join(`auction_${auction_id}`);
        });

        bidsSocketHandler(socket);
    });

    httpServer.listen(3000, () => {
        console.log("Servidor + Socket.IO corriendo en http://localhost:3000");
    });
}

bootstrap();