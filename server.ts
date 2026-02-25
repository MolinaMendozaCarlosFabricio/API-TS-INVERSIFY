import "reflect-metadata";
import express from "express";
import cors from "cors";
import { InversifyExpressServer } from "inversify-express-utils";
import { container } from "./src/shared/container.js";

async function bootstrap() {
    const server = new InversifyExpressServer(container);

    server.setConfig((app) => {
        app.use(cors({ origin: "*" }));
        app.use(express.json());
    });

    const app = server.build();

    app.listen(3000, () => {
        console.log("Servidor corriendo en http://localhost:3000");
    });
}

bootstrap();