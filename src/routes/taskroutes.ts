import { AbstractRoutes } from "./abstractroutes";
import { App } from "../app";

export class TaskRoutes extends AbstractRoutes {
    public constructor(app: App) {
        super(app);
    }

    protected override routes(): void {
        this.express.post("/add-template", (req, res, next) => {
            const name = req.body["name"];
            const description = req.body["description"];
            const dueAfter = req.body["due-after"];
            this.app.taskRepository.addTaskTemplate(name, description, dueAfter);
            res.send(`Created task ${name}!`)
        });

        this.express.post("/assign", (req, res, next) => {
            const taskId = req.body["task-id"];
            const personId = req.body["person-id"];
            this.app.taskRepository.assignTask(taskId, personId);
            res.send("Assigned task!");
        });

        this.express.post("/from-template", (req, res, next) => {
            const templateId = req.body["template-id"];
            this.app.taskRepository.createTaskFromTemplate(templateId);
            res.send("Created task from template!");
        });

        this.express.patch("/done", (req, res, next) => {
            const taskId = req.body["task-id"];
            this.app.taskRepository.setDone(taskId);
            res.send("Task is now set to done!");
        });

        this.express.get("/open", (req, res, next) => res.send(this.app.taskRepository.getOpenTasks()));

        this.express.get("/tasknames", (req, res, next) => res.send(this.app.taskRepository.getTaskNames()));

        this.express.get("/all-task-templates", (req, res, next) => res.send(this.app.taskRepository.getAllTaskTemplates()));
    }
}

