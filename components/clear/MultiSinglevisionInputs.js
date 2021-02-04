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
import MultiStandardInputsClearBasic from './singlevision/MultiStandardInputsClearBasic';
import MultiStandardInputsClearTransition from './singlevision/MultiStandardInputsClearTransition';

const axios = require("axios");

const MultiSinglevisionInputs = () => {
  const [selected, setSelected] = useState(0);

  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelected(selectedTabIndex),
    [],
  );

  const tabs = [
    {
      id: 'MultiStandardInputsClearBasic',
      title: 'Standard Clear Basic(Non-mirrored)',
      page: <MultiStandardInputsClearBasic />,
      content: 'Standard Clear Basic(Non-mirrored)',
      panelID: 'MultiStandardInputsClearBasic-content',
    },
    {
      id: 'MultiStandardInputsClearTransition',
      title: 'Standard Transition/Clear(Non-mirrored)',
      page: <MultiStandardInputsClearTransition />,
      content: 'Standard Transition/Clear(Non-mirrored)',
      panelID: 'MultiStandardInputsClearTransition-content',
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


