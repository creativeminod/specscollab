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
import MultiStandard from './singlevision/Multistandard';
import MultiIridium from './singlevision/Multiiridium';
import MultiPrizmcolorenhancing from './singlevision/Multiprizmcolorenhancing';
const axios = require("axios");

const MultiSinglevisionInputs = () => {
  const [selected, setSelected] = useState(0);

  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelected(selectedTabIndex),
    [],
  );

  const tabs = [
    {
      id: 'MultiStandard',
      title: 'MultiStandard',
      page: <MultiStandard />,
      content: 'Standard',
      panelID: 'MultiStandard-content',
    },
    {
      id: 'MultiIridium',
      title: 'MultiIridium',
      page: <MultiIridium />,
      content: 'Iridium',
      panelID: 'MultiIridium',
    },
    {
      id: 'MultiPrizmcolorenhancing',
      title: 'MultiPrizmcolorenhancing',
      page: <MultiPrizmcolorenhancing />,
      content: 'Prizm Color Enhancing',
      panelID: 'MultiPrizmcolorenhancing',
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
export default MultiSinglevisionInputs;


