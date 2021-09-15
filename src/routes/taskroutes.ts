import { AbstractRoutes } from "./abstractroutes";
import { App } from "../app";
import * as U from "../util";

export class TaskRoutes extends AbstractRoutes {
    public constructor(app: App) {
        super(app);
    }

    protected override routes(): void {
        this.express.post("/add-template", (req, res, next) => {
            console.log("add template request received");
            const name = req.body["name"];
            const description = req.body["description"];
            const dueAfter = req.body["due-after"];
            this.app.taskRepository.addTaskTemplate(name, description, dueAfter);
            res.send(`Created task ${name}!`)
        });

        this.express.post("/schedule", (req, res, next) => {
            console.log("schedule request received");
            const templateId: number = req.body["template-id"];
            const cronString: string = req.body["cron"];
            const valid = this.app.taskRepository.scheduleTask(templateId, cronString);
            if(valid) {
                U.setUpTaskSchedule(templateId, cronString, this.app.taskRepository);
            }
            res.send(valid ? "Assigned task!" : `Invalid cron: ${cronString}`);
        });

        this.express.post("/assign", (req, res, next) => {
            console.log("assign request received");
            const taskId = req.body["task-id"];
            const personId = req.body["person-id"];
            this.app.taskRepository.assignTask(taskId, personId);
            res.send("Assigned task!");
        });

        this.express.delete("/unassign", (req, res, next) => {
            console.log("unassign request received");
            const taskId = req.body["task-id"];
            const personId = req.body["person-id"];
            this.app.taskRepository.unassignTask(taskId, personId);
            res.send("Unassigned task!");
        });

        this.express.post("/from-template", (req, res, next) => {
            console.log("request to create task from template received");
            const templateId = req.body["template-id"];
            this.app.taskRepository.createTaskFromTemplate(templateId);
            res.send("Created task from template!");
        });

        this.express.patch("/done", (req, res, next) => {
            console.log("request to set task as done received");
            const taskId = req.body["task-id"];
            this.app.taskRepository.setDone(taskId);
            res.send("Task is now set to done!");
        });

        this.express.get("/open", (req, res, next) => {
            console.log("request to retrieve open tasks received");
            res.send(this.app.taskRepository.getOpenTasks());
        });

        this.express.get("/tasknames", (req, res, next) => {
            console.log("request to list all task names received")
            res.send(this.app.taskRepository.getTaskNames());
        });

        this.express.get("/all-task-templates", (req, res, next) => {
            console.log("request to list all templates received");
            res.send(this.app.taskRepository.getAllTaskTemplates());
        });
    }
}

