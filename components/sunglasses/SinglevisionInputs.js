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
import Standard from './singlevision/standard';
import Iridium from './singlevision/iridium';
import Prizmcolorenhancing from './singlevision/prizmcolorenhancing';
const axios = require("axios");

const SunglassesInputs = () => {
  const [selected, setSelected] = useState(0);

  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelected(selectedTabIndex),
    [],
  );

  const tabs = [
    {
      id: 'Standard',
      title: 'Standard',
      page: <Standard />,
      content: 'Standard',
      panelID: 'Standard-content',
    },
    {
      id: 'Iridium',
      title: 'Iridium',
      page: <Iridium />,
      content: 'Iridium',
      panelID: 'Iridium',
    },
    {
      id: 'Prizmcolorenhancing',
      title: 'Prizmcolorenhancing',
      page: <Prizmcolorenhancing />,
      content: 'Prizm Color Enhancing',
      panelID: 'Prizmcolorenhancing',
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
export default SunglassesInputs;


