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
import MultiSinglevisionInputs from '../components/clear/MultiSinglevisionInputs';
import MultiProgressiveInputs from '../components/clear/MultiProgressiveInputs';

const axios = require("axios");

const MultiSunglassesInputs = () => {
  const [selected, setSelected] = useState(0);

  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelected(selectedTabIndex),
    [],
  );

  const tabs = [
    {
      id: 'MultiSinglevisionInputs',
      title: 'Single Vision',
      page: <MultiSinglevisionInputs />,
      content: 'Single Vision',
      panelID: 'MultiSinglevisionInputs-content',
    },
    {
      id: 'MultiProgressiveInputs',
      title: 'Progressive',
      page: <MultiProgressiveInputs />,
      content: 'Progressive',
      panelID: 'MultiProgressiveInputs-content',
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
export default MultiSunglassesInputs;


