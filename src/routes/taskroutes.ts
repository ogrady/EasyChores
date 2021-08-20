import { AbstractRoutes } from "./abstractroutes";
import { App } from "../app";

export class TaskRoutes extends AbstractRoutes {
    public constructor(app: App) {
        super(app);
    }

    protected override routes(): void {
        this.express.post("/add", (req, res, next) => {
            const name = req.body["name"];
            const description = req.body["description"];
            const dueAfter = req.body["due-after"];
            this.app.taskRepository.addTaskTemplate(name, description, dueAfter);
        });

        this.express.post("/assign", (req, res, next) => {
            const taskId = req.body["task-id"];
            const personId = req.body["person-id"];
            this.app.taskRepository.assignTask(taskId, personId);
        });

        this.express.post("/copy", (req, res, next) => {
            const templateId = req.body["template-id"];
            this.app.taskRepository.createTaskFromTemplate(templateId);
        });

        this.express.post("/done", (req, res, next) => {
            const taskId = req.body["task-id"];
            this.app.taskRepository.setDone(taskId);
        });
    }
}