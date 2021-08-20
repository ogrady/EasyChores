var React = require("react");
var DefaultLayout = require("./layouts/default");

function TaskForm(props) {
  return (
    <DefaultLayout title={props.title}>
        <form action="/rest/task/add" method="POST">
            <input name="name"></input>
            <input name="description"></input>
            <input name="due-after"></input>
            <input type="submit"></input>
        </form>
      <div>Hello {props.name}</div>
    </DefaultLayout>
  );
}

module.exports = TaskForm;