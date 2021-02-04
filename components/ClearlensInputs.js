import React, { useState, Fragment, useCallback } from "react";
import ReactDOM from "react-dom";
import {
  Banner,
  Card,
  DisplayText,
  Form,
  FormLayout,
  Frame,
  Layout,
  Page,
  PageActions,
  TextField,
  Toast,
  TextContainer,
  Heading,
  Button,
  ButtonGroup,
  Tabs
} from '@shopify/polaris';
import SinglevisionInputs from '../components/clear/SinglevisionInputs';
import ProgressiveInputs from '../components/clear/ProgressiveInputs';

const axios = require("axios");

const ClearlensInputs = () => {
  const [selected, setSelected] = useState(0);

  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelected(selectedTabIndex),
    [],
  );

  const tabs = [
    {
      id: 'SinglevisionInputs',
      title: 'Single Vision',
      page: <SinglevisionInputs />,
      content: 'Single Vision',
      panelID: 'SinglevisionInputs-content',
    },
    {
      id: 'ProgressiveInputs',
      title: 'Progressive',
      page: <ProgressiveInputs />,
      content: 'Progressive',
      panelID: 'ProgressiveInputs-content',
    }
  ];
  return (
    <>
      <Card>
        <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
            {tabs[selected].page}
        </Tabs>
      </Card>
    </>
  );
};
export default ClearlensInputs;


