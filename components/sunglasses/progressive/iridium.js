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
import PolarizedInputsIridium from './iridium/PolarizedInputsIridium';
import PolarizedInputsNonpolarized from './iridium/PolarizedInputsNonpolarized';

const axios = require("axios");

const SunglassesInputs = () => {
  const [selected, setSelected] = useState(0);

  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelected(selectedTabIndex),
    [],
  );

  const tabs = [
    {
      id: 'PolarizedInputsIridium',
      title: 'IRIDIUM (MIRRORED) POLARIZED ',
      page: <PolarizedInputsIridium />,
      content: 'IRIDIUM (MIRRORED) POLARIZED',
      panelID: 'PolarizedInputsIridium-content',
    },
    {
      id: 'PolarizedInputsNonpolarized',
      title: 'IRIDIUM (MIRRORED) Non-POLARIZED ',
      page: <PolarizedInputsNonpolarized />,
      content: 'IRIDIUM (MIRRORED) Non-POLARIZED',
      panelID: 'PolarizedInputsNonpolarized-content',
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


