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
import SunglassesInputs from '../components/SunglassesInputs';
import ClearlensInputs from '../components/ClearlensInputs';

const axios = require("axios");

const EditProductlens = () => {
  const [selected, setSelected] = useState(0);

  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelected(selectedTabIndex),
    [],
  );

  const tabs = [
    {
      id: 'SunglassesInputs',
      title: 'Sunglasses',
      page: <SunglassesInputs />,
      content: 'Sunglasses',
      panelID: 'SunglassesInputs-content',
    },
    {
      id: 'ClearlensInputs',
      title: 'Clear',
      page: <ClearlensInputs />,
      content: 'Clear',
      panelID: 'ClearlensInputs-content',
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
export default EditProductlens;


