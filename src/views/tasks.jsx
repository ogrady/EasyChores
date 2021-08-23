var React = require("react");
var DefaultLayout = require("./layouts/default");
import { App } from "../app";

export function TaskTemplateForm(props) {
  return (
      <form action="/rest/task/add-template" method="POST">
        <fieldset>
          <legend>Name</legend>
          <label htmlFor="name">
              Title: <input name="name" placeholder="title"></input>
          </label>
          <label htmlFor="description">
              Description: <input name="description" placeholder="description"></input>
          </label>
        </fieldset>
        <fieldset>
          <legend>Due after</legend>
          <label htmlFor="days">
              <input name="due-days" type="number" placeholder="0"></input> days
              <input name="due-hours" type="number" min="0" max="23" placeholder="0"></input> hours
              <input name="due-minutes" type="number" min="0" max="59" placeholder="0"></input> minutes
          </label>
        </fieldset>
        <input type="submit" value="Create Task Template"></input>
      </form> 
  );
}

export function TaskForm(props) {
  return (
    <>
      <form action="/rest/task/from-template" method="POST" id="task-form">
        <fieldset>
          <legend>Name</legend>
          <label htmlFor="name">
              Title: <input name="name" placeholder="name" id="name"></input>
          </label>
          <input type="hidden" id="template-id" name="template-id" value=""></input>
        </fieldset>
        <input type="submit" value="Create Task"></input>
      </form> 
    </>
  );
}

function TaskTemplateListRow(props) {
  return (
    <tr>
    <th scope="row">{props.template.id}</th>
    <td>{props.template.name}</td>
    <td>{props.template.description}</td>
    <td>{props.template.due_after}</td>
  </tr>
  );
}

export function TaskTemplateList(props) {
  return (
    <table className="table table-striped table-bordered" id="task-template-list">
      <thead className="thead-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Description</th>
          <th scope="col">Due After (Minutes)</th>
        </tr>
      </thead>
      <tbody>
        { App.getInstance().taskRepository.getAllTaskTemplates().map((t, i) => <TaskTemplateListRow template={t} />) }
      </tbody>
    </table>
  );
}