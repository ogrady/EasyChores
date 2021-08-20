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