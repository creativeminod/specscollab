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
import MultiPolarizedInputsIridium from './iridium/MultiPolarizedInputsIridium';
import MultiPolarizedInputsNonpolarized from './iridium/MultiPolarizedInputsNonpolarized';

const axios = require("axios");

const Multiiridium = () => {
  const [selected, setSelected] = useState(0);

  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelected(selectedTabIndex),
    [],
  );

  const tabs = [
    {
      id: 'MultiPolarizedInputsIridium',
      title: 'IRIDIUM (MIRRORED) POLARIZED ',
      page: <MultiPolarizedInputsIridium />,
      content: 'IRIDIUM (MIRRORED) POLARIZED',
      panelID: 'MultiPolarizedInputsIridium-content',
    },
    {
      id: 'MultiPolarizedInputsNonpolarized',
      title: 'IRIDIUM (MIRRORED) Non-POLARIZED ',
      page: <MultiPolarizedInputsNonpolarized />,
      content: 'IRIDIUM (MIRRORED) Non-POLARIZED',
      panelID: 'MultiPolarizedInputsNonpolarized-content',
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
export default Multiiridium;


