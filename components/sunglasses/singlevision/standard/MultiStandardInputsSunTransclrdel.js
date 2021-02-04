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
  Thumbnail,
  Scrollable
} from '@shopify/polaris';
import store from 'store-js';
import gql from 'graphql-tag';
import { Mutation, Query } from 'react-apollo';
import { Redirect } from '@shopify/app-bridge/actions';
import { Context } from '@shopify/app-bridge-react';

const axios = require("axios");

const DELETE_METAFIELD = gql`
  mutation metafieldDelete($productmetadel: MetafieldDeleteInput!) {
    metafieldDelete(input: $productmetadel) {
      deletedId
      userErrors {
        field
        message
      }
    }
  }
`;

const GET_PRODUCTS_BY_ID = gql`
  query getProducts($presc_ids: [ID!]!) {
    nodes(ids: $presc_ids) {
      ... on Product {
        title
        handle
        descriptionHtml
        id
        sg_sv_std_tc: metafields(namespace: "sg_sv_std_tc", first: 100){
          edges {
            node {
              id
              namespace
              key
              value
            }
          }
        }
        images(first: 1) {
          edges {
            node {
              originalSrc
              altText
            }
          }
        }
        variants(first: 1) {
          edges {
            node {
              price
              id
            }
          }
        }
      }
    }
  }
`;

class MultiStandardInputsSunTransclrdel extends React.Component {
  static contextType = Context;

  render() {
    const app = this.context;
    const redirectToProduct = () => {
      const redirect = Redirect.create(app);
      redirect.dispatch(
        Redirect.Action.APP,
        '/edit-product_lens',
      );
    };
    return (
      <div>
        <Mutation mutation={DELETE_METAFIELD} >
          {(handleSubmit, {error, data}) => {
            const showError = error && (
              <Banner status="critical">{error.message}</Banner>
            );
            const showToast = data && data.metafieldDelete && (
              <Toast
                content="Sucessfully Deleted"
                onDismiss={showToast}
              />
            );
            return (
              <Frame>
                {showToast}
                <Page title="Images" description="desc">
                  <Card sectioned>
                    <FormLayout>
                      <FormLayout.Group>
                        <Query query={GET_PRODUCTS_BY_ID} variables={{ presc_ids: store.get('presc_ids') }}>
                                {({ data, loading, error }) => {
                                  if (loading) return <div>Loading…</div>;
                                  if (error) return <div>{error.message}</div>;
                                  if (data.nodes[0].sg_sv_std_tc){
                                    const clr = data.nodes[0].sg_sv_std_tc.edges.length;
                                    let clrarray = [];
                                    for (let i = 0; i < clr; i++) {
                                      const imag = data.nodes[0].sg_sv_std_tc.edges[i].node.value.split('"');
                                      const idx = data.nodes[0].sg_sv_std_tc.edges[i].node.id;
                                      const idx_key = data.nodes[0].sg_sv_std_tc.edges[i].node.key;
                                      const idx_namespace = data.nodes[0].sg_sv_std_tc.edges[i].node.namespace;
                                      
                                      clrarray.push(
                                        <div>
                                          <div><Thumbnail source={imag[11]} alt="Black choker necklace"/></div>
                                          <div>
                                              <TextField readOnly={true} prefix="ID:" value={idx} id="gid" type="text" name="gid" onChange={event => handleInputsChange(index, event)}  />
                                              <TextField readOnly={true} prefix="Key:" value={idx_key} id="key" type="text" name="key" onChange={event => handleInputsChange(index, event)}  />
                                              <TextField readOnly={true} prefix="Name:" value={imag[3]} id="name" type="text" name="name" onChange={event => handleInputsChange(index, event)}  />
                                              <TextField readOnly={true} prefix="video_link:" value={imag[15]} id="url" type="text" name="url" />
                                              <TextField readOnly={true} prefix="price($):" value={imag[7]} id="price" type="number" name="price" onChange={event => handleInputsChange(index, event)}  />
                                              <TextField readOnly={true} prefix="Image_Url:" value={imag[11]} id="imageurl" type="url" name="url" onChange={event => handleInputsChange(index, event)}  />
                                          </div>
                                          <PageActions 
                                              primaryAction={[
                                                {
                                                  content: 'Delete', 
                                                  onAction: () => {
                                                      const productmetadel = {                                                  
                                                          "id": data.nodes[0].sg_sv_std_tc.edges[i].node.id
                                                      }
                                                      handleSubmit({
                                                        variables: { 
                                                          productmetadel: productmetadel 
                                                        }, 
                                                      }); 
                                                  } 
                                                } 
                                              ]}
                                              secondaryActions={[
                                                {
                                                  content: 'Edit',
                                                  onAction: () => {
                                                    store.set('lens_edit-id', data.nodes[0].sg_sv_std_tc.edges[i].node.id);
                                                    store.set('lens_edit-key', data.nodes[0].sg_sv_std_tc.edges[i].node.key);
                                                    store.set('lens_edit-namespace', data.nodes[0].sg_sv_std_tc.edges[i].node.namespace);
                                                    store.set('lens_edit-video_link', imag[15]);
                                                    store.set('lens_edit-Image_Url', imag[11]);
                                                    store.set('lens_edit-price', imag[7]);
                                                    store.set('lens_edit-name', imag[3]);
                                                    // console.log()
                                                    redirectToProduct();
                                                  }
                                                }
                                              ]}
                                          />
                                        </div>
                                      );

                                    }
                                    console.log(clr);
                                    return(
                                      <div>
                                        <Scrollable shadow style={{height: '600px'}}>
                                          {clrarray}
                                        </Scrollable> 
                                      </div>
                                    );
                                  }else{
                                    return(
                                      <div>
                                      No Data Found
                                      </div>
                                    );
                                  }
                                }}
                        </Query>
                      </FormLayout.Group>
                    </FormLayout>
                  </Card>
                </Page>
              </Frame>
            );
          }}

        </Mutation>
      </div>
    );
  }
}
export default MultiStandardInputsSunTransclrdel;