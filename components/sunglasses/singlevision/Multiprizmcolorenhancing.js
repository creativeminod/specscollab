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
import MultiPrizmInputsNonpolarized from './prizmcolorenhancing/MultiPrizmInputsNonpolarized';
import MultiPrizmInputsPolarized from './prizmcolorenhancing/MultiPrizmInputsPolarized';

const axios = require("axios");

const Multiprizmcolorenhancing = () => {
  const [selected, setSelected] = useState(0);

  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelected(selectedTabIndex),
    [],
  );

  const tabs = [
    {
      id: 'MultiPrizmInputsNonpolarized',
      title: 'PRIZM NON-POLARIZED',
      page: <MultiPrizmInputsNonpolarized />,
      content: 'PRIZM NON-POLARIZED',
      panelID: 'MultiPrizmInputsNonpolarized-content',
    },
    {
      id: 'MultiPrizmInputsPolarized',
      title: 'PRIZM POLARIZED',
      page: <MultiPrizmInputsPolarized />,
      content: 'PRIZM POLARIZED',
      panelID: 'MultiPrizmInputsPolarized-content',
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
export default Multiprizmcolorenhancing;


