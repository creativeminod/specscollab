import {Tabs,Scrollable,EmptyState,Banner, Card, DisplayText, Form, FormLayout, Frame, Layout, Page, PageActions, TextField, Toast, TextContainer, Heading, Button, ResourceList, Stack, TextStyle, Thumbnail,ButtonGroup } from '@shopify/polaris';
import store from 'store-js';
import gql from 'graphql-tag';
import React, { useState, Fragment, useCallback } from "react";
import ReactDOM from "react-dom";
import { Mutation, Query } from 'react-apollo';
import { ResourcePicker, TitleBar, Context } from '@shopify/app-bridge-react';
import { Redirect } from '@shopify/app-bridge/actions';
import ResourceListWithProducts from '../components/ResourceListimage';
import MultiResourceListimage from '../components/MultiResourceListimage';
import MultiResourceListimageEmpty from '../components/MultiResourceListimageEmpty';
import MultiSunglassesInputs from '../components/MultiSunglassesInputs';
import MultiClearlensInputs from '../components/MultiClearlensInputs';

const img = 'https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg';

const MultiImageManager = () => {
  const [selected, setSelected] = useState(0);

  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelected(selectedTabIndex),
    [],
  );
  const emptyState = !store.get('ids');
  store.set('showToastalert',0);
  store.set('multi_ids',[]);
  const tabs = [
    {
      id: 'MultiSunglassesInputs',
      title: 'Sunglasses',
      page: <MultiSunglassesInputs />,
      content: 'Sunglasses',
      panelID: 'MultiSunglassesInputs-content',
    },
    {
      id: 'MultiClearlensInputs',
      title: 'Clear',
      page: <MultiClearlensInputs />,
      content: 'Clear',
      panelID: 'MultiClearlensInputs-content',
    }
  ];
  return (
    <>

        <Page>
          <Card>
            <MultiResourceListimageEmpty />
            
          </Card>
          <Card>
            <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
                {tabs[selected].page}
            </Tabs>
          </Card>
        </Page>
    </>
  );
};
export default MultiImageManager;