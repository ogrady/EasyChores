import { DBRepository } from "./dbrepository";
import * as database from "../database";
import { SSL_OP_NETSCAPE_REUSE_CIPHER_CHANGE_BUG } from "constants";

export class TaskRepository extends DBRepository {
    public getTaskNames(): [number, string][] {
        return this.execute(db => db.prepare("SELECT id, name FROM task_templates")?.all().map(row => [row.id as number, row.name as string])) ?? [];
    }

    public getAllTaskTemplates(): any[] {
        return this.execute(db => db.prepare("SELECT id, name, description, due_after FROM task_templates")?.all()) ?? [];
    }

    public getOpenTasks(): any {
        return this.execute(db => db.prepare(`SELECT task_id, task_name, task_description, start_time, due_after, due, assignee_id, assignee_name FROM open_tasks`).all());
    }

    public assignTask(taskId: number, personId: number): void {
        this.execute(db => db.prepare("INSERT INTO assignees(task_id, person_id)").run(taskId, personId));
    }

    public createTaskFromTemplate(templateId: number, start: Date = new Date()): void {
        console.log(templateId, start);
        this.execute(db => db.prepare("INSERT INTO tasks(template_id, start_time) VALUES (?, ?)").run(templateId, database.Database.date(start)));
    }

    public setDone(taskId: number): void {
        console.log(database.Database.date(new Date()), taskId)
        this.execute(db => db.prepare("UPDATE tasks SET done = ? WHERE id = ?").run(database.Database.date(new Date()), taskId));
    }

    public constructor(database: database.Database) {
        super(database);
    }

    public addTaskTemplate(name: string, description: string, dueAfter: number): number | undefined {
        return this.execute(db => {
            let lastId: number | undefined = undefined;
            db.transaction((_) => {
                lastId = db.prepare("INSERT INTO task_templates(name, description, due_after) VALUES (?, ?, ?)")
                    .run(name, description, dueAfter)
                    .lastInsertRowid as number;
            })(null);
            return lastId;
        });
    }
}
