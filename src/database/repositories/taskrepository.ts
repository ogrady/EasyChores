import { DBRepository } from "./dbrepository";
import * as db from "../database";

export class TaskRepository extends DBRepository {
    public assignTask(taskId: number, personId: number): void {
        this.execute(db => db.prepare("INSERT INTO assignees(task_id, person_id)").run(taskId, personId));
    }

    public createTaskFromTemplate(templateId: number): void {
        this.execute(db => db.prepare("INSERT INTO tasks(template_id, created, due) VALUES (?, ?, ?)").run(templateId, new Date(), 42));  // FIXME: due from template
    }

    public setDone(taskId: number): void {
        this.execute(db => db.prepare("UPDATE tasks SET done = ? WHERE id = ?").run(taskId, new Date()));
    }

    public constructor(database: db.Database) {
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

/*
CREATE TABLE task_templates (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    due_after INTEGER, -- minutes
    created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP    
);


CREATE TABLE tasks (
    id INTEGER PRIMARY KEY,
    template_id INTEGER NOT NULL,
    created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    due TIMESTAMP,
    FOREIGN KEY(template_id) REFERENCES tasks(id)
);
*/