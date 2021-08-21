var React = require("react");
import { DefaultLayout } from "./layouts/default";
import { Tab, Tabs, TabList, TabPanel, setTabIndex } from 'react-tabs';

function HelloMessage(props) {
  return (
    <DefaultLayout title={props.title}>

    </DefaultLayout>
  );
}

module.exports = HelloMessage;