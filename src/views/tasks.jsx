var React = require("react");
var DefaultLayout = require("./layouts/default");

export function TaskForm(props) {
  return (
      <form action="/rest/task/add" method="POST">
        <fieldset>
          <legend>Name</legend>
          <label for="name">
              Title: <input name="name" placeholder="title"></input>
          </label>
          <label for="description">
              Description: <input name="description" placeholder="description"></input>
          </label>
        </fieldset>
        <fieldset>
          <legend>Due after</legend>
          <label for="days">
              <input name="due-days" type="number" placeholder="0"></input> days
              <input name="due-hours" type="number" min="0" max="23" placeholder="0"></input> hours
              <input name="due-minutes" type="number" min="0" max="59" placeholder="0"></input> minutes
          </label>
        </fieldset>
        <input type="submit" value="Create Task"></input>
      </form> 
  );
}

//module.exports = TaskForm;