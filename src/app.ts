import * as bodyParser from "body-parser";
import express from "express";
import { Logger } from "./logger/logger";
import { TaskRoutes } from "./routes/taskroutes";
import { Database } from "./database/database";
import { TaskRepository } from "./database/repositories/taskrepository";
import { PersonRepository } from "./database/repositories/personrepository";
import { PersonRoutes } from "./routes/personroutes";

export class App {
    private static instance: App = new App();

    public static getInstance(): App {
        return App.instance;
    }

    public readonly express: express.Application;
    public readonly logger: Logger;
    public readonly database: Database;
    public readonly taskRepository: TaskRepository;
    public readonly personRepository: PersonRepository;

    private constructor() {
        this.logger = new Logger();
        this.database = Database.getInstance(__dirname + "/../database/database.db");
        this.taskRepository = new TaskRepository(this.database);
        this.personRepository = new PersonRepository(this.database);
        this.express = express();
        this.middleware();
        this.routes();
    }

    // Configure Express middleware.
    private middleware(): void {
        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended: false }));
    }

    private routes(): void {
        this.express.set("views", __dirname + "/views");
        this.express.set("view engine", "jsx");
        this.express.engine("jsx", require("express-react-views").createEngine());

        this.express.get("/", (req, res, next) => {
            res.render("index", { 
                title: "Chores",
                templates: this.taskRepository.getAllTaskTemplates()
            });
        });

        this.express.use("/rest/person", new PersonRoutes(this).express);
        this.express.use("/rest/task", new TaskRoutes(this).express);

        this.express.use("/static", express.static(__dirname + "/public"));

        // handle undefined routes
        this.express.use("*", (req, res, next) => {
            res.sendStatus(404);
        });

        
    }
}

//export default new App().express;
