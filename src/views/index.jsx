var React = require("react");
var DefaultLayout = require("./layouts/default");
import { Tab, Tabs, TabList, TabPanel, setTabIndex } from 'react-tabs';

function HelloMessage(props) {
  return (
    <DefaultLayout title={props.title}>

        <div id="tabs">
        <ul>
            <li><a href="#fragment-1">Task List</a></li>
            <li><a href="#fragment-2">Tasks</a></li>
            <li><a href="#fragment-3">Persons</a></li>
        </ul>
        <div id="fragment-1">
            asdasdasd
        </div>
        <div id="fragment-2">
            gfds
        </div>
        <div id="fragment-3">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
        </div>
        </div>
    </DefaultLayout>
  );
}

module.exports = HelloMessage;