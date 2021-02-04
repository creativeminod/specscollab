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
import StandardInputsSunNonpol from './standard/StandardInputsSunNonpol';
import StandardInputsSunPol from './standard/StandardInputsSunPol';
import StandardInputsSunTransclr from './standard/StandardInputsSunTransclr';

const axios = require("axios");

const SunglassesInputs = () => {
  const [selected, setSelected] = useState(0);

  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelected(selectedTabIndex),
    [],
  );

  const tabs = [
    {
      id: 'StandardInputsSunNonpol',
      title: 'Standard Non-Polarised(Non-mirrored)',
      page: <StandardInputsSunNonpol />,
      content: 'Standard Non-Polarised(Non-mirrored)',
      panelID: 'StandardInputsSunNonpol-content',
    },
    {
      id: 'StandardInputsSunPol',
      title: 'Standard Polarised(Non-mirrored)',
      page: <StandardInputsSunPol />,
      content: 'Standard Polarised(Non-mirrored)',
      panelID: 'StandardInputsSunPol-content',
    },
    {
      id: 'StandardInputsSunTransclr',
      title: 'Standard Transition/Clear(Non-mirrored)',
      page: <StandardInputsSunTransclr />,
      content: 'Standard Transition/Clear(Non-mirrored)',
      panelID: 'StandardInputsSunTransclr-content',
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


