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
    start_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    done TIMESTAMP DEFAULT null,
    FOREIGN KEY(template_id) REFERENCES tasks(id)
);


CREATE TABLE persons (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL
);


CREATE TABLE assignees (
    id INTEGER PRIMARY KEY,
    task_id INTEGER,
    person_id INTEGER,
    UNIQUE(task_id, person_id),
    FOREIGN KEY(task_id) REFERENCES tasks(id),
    FOREIGN KEY(person_id) REFERENCES persons(id)
);


CREATE VIEW open_tasks AS
    SELECT 
        t.id AS task_id,
        tt.name AS task_name,
        tt.description AS task_description,
        t.start_time AS start_time,
        tt.due_after AS due_after,
        t.start_time + tt.due_after AS due,
        a.person_id AS assignee_id,
        p.name AS assignee_name
    FROM 
        tasks AS t 
        JOIN task_templates AS tt 
        ON t.template_id = tt.id 
        LEFT JOIN assignees AS a
        ON t.id = a.task_id
        LEFT JOIN persons AS p
        ON p.id = a.person_id
    WHERE 
        t.done IS NULL
;