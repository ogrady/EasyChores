import { DBRepository } from "./dbrepository";
import * as database from "../database";
import * as cron from "node-cron";

export interface Schedule {
    template_id: number,
    cron: string
}


export class TaskRepository extends DBRepository {
    public constructor(database: database.Database) {
        super(database);
    }

    public getTaskNames(): [number, string][] {
        return this.execute(db => db.prepare("SELECT id, name FROM task_templates")?.all().map(row => [row.id as number, row.name as string])) ?? [];
    }

    public getAllTaskTemplates(): any[] {
        return this.execute(db => db.prepare("SELECT id, name, description, due_after FROM task_templates")?.all()) ?? [];
    }

    public getOpenTasks(): any {
        return this.execute(db => db.prepare(`
        SELECT 
            task_id, task_name, task_description, start_time, due_after, due,
            group_concat(assignee_id, ',') AS assignee_ids
        FROM 
            open_tasks
        GROUP BY 
            task_id, task_name, task_description, start_time, due_after, due
    `).all());
    }

    public assignTask(taskId: number, personId: number): void {
        this.execute(db => db.prepare("INSERT INTO assignees(task_id, person_id) VALUES(?, ?)").run(taskId, personId));
    }

    public unassignTask(taskId: number, personId: number): void {
        this.execute(db => db.prepare("DELETE FROM assignees WHERE task_id = ? AND person_id = ?").run(taskId, personId));
    }

    public createTaskFromTemplate(templateId: number, start: Date = new Date()): void {
        this.execute(db => db.prepare("INSERT INTO tasks(template_id, start_time) VALUES (?, ?)").run(templateId, database.Database.date(start)));
    }

    public scheduleTask(templateId: number, cronString: string): boolean {
        const valid: boolean = cron.validate(cronString)
        if(valid) {
            this.execute(db => db.prepare("INSERT INTO schedules(template_id, cron) VALUES (?, ?)").run(templateId, cronString));
        }
        return valid;
    }

    public getAllSchedules(): Schedule[] {
        return this.execute(db => db.prepare("SELECT template_id, cron FROM schedules").all()) as Schedule[];
    }

    public setDone(taskId: number): void {
        this.execute(db => db.prepare("UPDATE tasks SET done = ? WHERE id = ?").run(database.Database.date(new Date()), taskId));
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
