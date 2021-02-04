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
import PrizmInputsNonpolarized from './prizmcolorenhancing/PrizmInputsNonpolarized';
import PrizmInputsPolarized from './prizmcolorenhancing/PrizmInputsPolarized';

const axios = require("axios");

const SunglassesInputs = () => {
  const [selected, setSelected] = useState(0);

  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelected(selectedTabIndex),
    [],
  );

  const tabs = [
    {
      id: 'PrizmInputsNonpolarized',
      title: 'PRIZM NON-POLARIZED',
      page: <PrizmInputsNonpolarized />,
      content: 'PRIZM NON-POLARIZED',
      panelID: 'PrizmInputsNonpolarized-content',
    },
    {
      id: 'PrizmInputsPolarized',
      title: 'PRIZM POLARIZED',
      page: <PrizmInputsPolarized />,
      content: 'PRIZM POLARIZED',
      panelID: 'PrizmInputsPolarized-content',
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


