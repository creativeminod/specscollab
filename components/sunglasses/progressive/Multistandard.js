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
import MultiStandardInputsSunNonpol from './standard/MultiStandardInputsSunNonpol';
import MultiStandardInputsSunPol from './standard/MultiStandardInputsSunPol';
import MultiStandardInputsSunTransclr from './standard/MultiStandardInputsSunTransclr';

const axios = require("axios");

const Multistandard = () => {
  const [selected, setSelected] = useState(0);

  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelected(selectedTabIndex),
    [],
  );

  const tabs = [
    {
      id: 'MultiStandardInputsSunNonpol',
      title: 'Standard Non-Polarised(Non-mirrored)',
      page: <MultiStandardInputsSunNonpol />,
      content: 'Standard Non-Polarised(Non-mirrored)',
      panelID: 'MultiStandardInputsSunNonpol-content',
    },
    {
      id: 'MultiStandardInputsSunPol',
      title: 'Standard Polarised(Non-mirrored)',
      page: <MultiStandardInputsSunPol />,
      content: 'Standard Polarised(Non-mirrored)',
      panelID: 'MultiStandardInputsSunPol-content',
    },
    {
      id: 'MultiStandardInputsSunTransclr',
      title: 'Standard Transition/Clear(Non-mirrored)',
      page: <MultiStandardInputsSunTransclr />,
      content: 'Standard Transition/Clear(Non-mirrored)',
      panelID: 'MultiStandardInputsSunTransclr-content',
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
export default Multistandard;


