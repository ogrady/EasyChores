import express from "express";
import { App } from "../app";
import { Logger } from "../logger/logger";

export abstract class AbstractRoutes {
    public readonly app: App;
    public readonly express: express.Application;
    public readonly logger: Logger;

    constructor(app: App) {
        this.app = app;
        this.express = express();
        this.middleware();
        this.routes();
        this.logger = new Logger();
    }

    private middleware(): void {
        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended: false }));
    }

    protected abstract routes(): void;
}