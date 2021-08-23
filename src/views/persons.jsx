var React = require("react");
var DefaultLayout = require("./layouts/default");
import { App } from "../app";

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

function PersonListRow(props) {
  return (
    <tr>
    <th scope="row">{props.person.id}</th>
    <td>{props.person.name}</td>
  </tr>
  );
}

export function PersonList(props) {
  return (
    <table className="table table-striped table-bordered" id="person-list">
      <thead className="thead-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
        </tr>
      </thead>
      <tbody>
        { App.getInstance().personRepository.getAllPersons().map((p, i) => <PersonListRow person={p} />) }
      </tbody>
    </table>
  );
}



