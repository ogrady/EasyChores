import React from "react"
import { OpenTaskList, TaskForm, TaskTemplateForm, TaskTemplateList } from "../tasks";
import { PersonForm, PersonList } from "../persons";

export function DefaultLayout(props) {
  return (
    <html>
      <head>
            <link rel="stylesheet" href="/static/css/jquery-ui.min.css"></link>
            <link rel="stylesheet" href="/static/css/jquery-ui.structure.min.css"></link>
            <link rel="stylesheet" href="/static/css/jquery-ui.theme.min.css"></link>
            <link rel="stylesheet" href="/static/css/multi-select.css"></link>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossOrigin="anonymous"></link>
            <link href="//netdna.bootstrapcdn.com/twitter-bootstrap/2.3.2/css/bootstrap-combined.no-icons.min.css" rel="stylesheet"></link>
            <link href="//netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.css" rel="stylesheet"></link>
            <link href="/static/css/main.css" rel="stylesheet"></link>
            <script src="/static/js/jquery.js"></script>
            <script src="/static/js/jquery-ui.min.js"></script>
            <script src="/static/js/jquery.multi-select.js"></script>
            <script src="/static/js/bstable.js"></script> 
            

            <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossOrigin="anonymous"></script>

            <script src="/static/js/main.js"></script>
            <title>{props.title}</title>
        </head>
        <body>
            <div id="tabs">
            <ul>
                <li><a href="#task-list-tab">Task List</a></li>
                <li><a href="#tasks-tab">Tasks Templates</a></li>
                <li><a href="#persons-tab">Persons</a></li>
            </ul>
            <div id="task-list-tab">
                <TaskForm></TaskForm>
                <OpenTaskList></OpenTaskList>
            </div>
            <div id="tasks-tab">
                <TaskTemplateForm></TaskTemplateForm>
                <TaskTemplateList></TaskTemplateList>
            </div>
            <div id="persons-tab">
                <PersonForm></PersonForm>
                <PersonList></PersonList>
            </div>
            </div>

            <span class="ui-icon ui-icon-check"></span>



        </body>
    </html>
  );
}