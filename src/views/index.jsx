var React = require("react");
var DefaultLayout = require("./layouts/default");
import { Tab, Tabs, TabList, TabPanel, setTabIndex } from 'react-tabs';

function HelloMessage(props) {
  return (
    <DefaultLayout title={props.title}>

    </DefaultLayout>
  );
}

module.exports = HelloMessage;