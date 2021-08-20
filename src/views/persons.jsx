var React = require("react");
var DefaultLayout = require("./layouts/default");

function PersonForm(props) {
  return (
    <DefaultLayout title={props.title}>
        <form action="/rest/person/add" method="POST">
            <input name="name"></input>
        </form>
    </DefaultLayout>
  );
}

module.exports = TaskForm;