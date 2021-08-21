import React from "react"
import { TaskForm, TaskTemplateForm } from "../tasks";
import { PersonForm } from "../persons";

export function DefaultLayout(props) {
  return (
    <html>
      <head>
            <link rel="stylesheet" href="/static/css/jquery-ui.min.css"></link>
            <link rel="stylesheet" href="/static/css/jquery-ui.structure.min.css"></link>
            <link rel="stylesheet" href="/static/css/jquery-ui.theme.min.css"></link>
            <script src="/static/js/jquery.js"></script>
            <script src="/static/js/jquery-ui.min.js"></script>
            <script src="/static/js/main.js"></script>
            <title>{props.title}</title>
        </head>
        <body>
            {props.children}
            <div id="tabs">
            <ul>
                <li><a href="#task-list-tab">Task List</a></li>
                <li><a href="#tasks-tab">Tasks Templates</a></li>
                <li><a href="#persons-tab">Persons</a></li>
            </ul>
            <div id="task-list-tab">
                <TaskForm></TaskForm>
            </div>
            <div id="tasks-tab">
                <TaskTemplateForm></TaskTemplateForm>
            </div>
            <div id="persons-tab">
                <PersonForm></PersonForm>
            </div>
            </div>
        </body>
    </html>
  );
}