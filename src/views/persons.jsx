var React = require("react");
var DefaultLayout = require("./layouts/default");

export function PersonForm(props) {
  return (
        <form action="/rest/person/add" method="POST">
          <fieldset>
            <legend>Name</legend>
            <label htmlFor="name">
                Name: <input name="name" placeholder="name"></input>
            </label>
            </fieldset>
          <input type="submit" value="Create Person"></input>
        </form> 
  );
}