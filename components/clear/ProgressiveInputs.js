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
import StandardInputsClearBasic from './progressive/StandardInputsClearBasic';
import StandardInputsClearTransition from './progressive/StandardInputsClearTransition';

const axios = require("axios");

const ClearlensInputs = () => {
  const [selected, setSelected] = useState(0);

  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelected(selectedTabIndex),
    [],
  );

  const tabs = [
    {
      id: 'StandardInputsClearBasic',
      title: 'Standard Clear Basic(Non-mirrored)',
      page: <StandardInputsClearBasic />,
      content: 'Standard Clear Basic(Non-mirrored)',
      panelID: 'StandardInputsClearBasic-content',
    },
    {
      id: 'StandardInputsClearTransition',
      title: 'Standard Transition/Clear(Non-mirrored)',
      page: <StandardInputsClearTransition />,
      content: 'Standard Transition/Clear(Non-mirrored)',
      panelID: 'StandardInputsClearTransition-content',
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


