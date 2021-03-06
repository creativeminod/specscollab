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
import TransitionsInputsdel from './TransitionsInputsdel';

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
}`;

const ADD_METAFIELD = gql`
  mutation productUpdate($productmeta: ProductInput!) {
    productUpdate(input: $productmeta) {
      product {
        id
        title
        metafields(first: 100) {
          edges {
            node {
              id
              namespace
              key
              value
            }
          }
        }
      }
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
        clear: metafield(namespace: "clear", key: "clear") {
          id
          key
          namespace
          value
        }
        transitions_lenses: metafields(namespace: "transitions_lenses", first: 10){
          edges {
            node {
              id
              namespace
              key
              value
            }
          }
        }
        singlevision: metafield(namespace: "singlevision", key: "singlevision") {
          id
          key
          namespace
          value
        }
        progressive: metafield(namespace: "progressive", key: "progressive") {
          id
          key
          namespace
          value
        }
        standard: metafield(namespace: "standard", key: "standard") {
          id
          key
          namespace
          value
        }
        prizm: metafield(namespace: "prizm", key: "prizm") {
          id
          key
          namespace
          value
        }
        polarized: metafield(namespace: "polarized", key: "polarized") {
          id
          key
          namespace
          value
        }
        transitions: metafield(namespace: "transitions", key: "transitions") {
          id
          key
          namespace
          value
        }
        anti_fog: metafield(namespace: "anti_fog", key: "anti_fog") {
          id
          key
          namespace
          value
        }
        anti_reflection: metafield(namespace: "anti_reflection", key: "anti_reflection") {
          id
          key
          namespace
          value
        }
        scratchprotection: metafield(namespace: "scratchprotection", key: "scratchprotection") {
          id
          key
          namespace
          value
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

const TransitionsInputs = () => {
  const [inputFields, setInputFields] = useState([
    { name:'', image_upload: null, price: '' }
  ]);

  const [inputResponse, setInputResponse] = useState([
    { name:'', image_upload: null, price: null }
  ]);

  const handleAddFields = () => {
    const values = [...inputFields];
    values.push({ name:'', image_upload: null, price: '' });
    setInputFields(values);
  };

  const handleRemoveFields = index => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  };

  const handleInputsChange = (index, field) => {
    const values = [...inputFields];
    if (event.target.name === "image_upload") {
      values[index].image_upload = event.target.files[0];
    } else if (event.target.name === "name") {
      values[index].name = event.target.value;
    }else {
      values[index].price = event.target.value;
    }
    setInputFields(values);
  };
  const handleSubmit = e => {
    
  };
  const DeleteMutation = (field) => {
    store.set('lensitem_edit_id', field);
  };
  return (
    <>
    
      <Mutation
        mutation={ADD_METAFIELD}
      >
        {(handleSubmit, {error, data}) => {
          const showError = error && (
            <Banner status="critical">{error.message}</Banner>
          );
          const showToast = data && data.productUpdate && (
            <Toast
              content="Sucessfully updated"
              onDismiss={showToast}
            />
          );
          
          return (
            <Frame>
              {showToast}
           
              <Page title="Transitions" description="desc">
                <Form onSubmit={handleSubmit}>
                  <div className="form-row">

                      {inputFields.map((inputField, index) => (
                        <Fragment key={`${inputField}~${index}`}>
                        <Card sectioned>
                          <FormLayout>
                            <FormLayout.Group>
                              
                            <TextField
                              prefix=""
                              value={inputField.image_upload}
                              label="Add Image"
                              id="image_upload"
                              type="file"
                              name="image_upload"
                              onChange={event => handleInputsChange(index, event)}
                            /> 
                            <TextField
                              prefix=""
                              value={inputField.name}
                              label="Name"
                              id="name"
                              type="text"
                              name="name"
                              onChange={event => handleInputsChange(index, event)}
                            />                 
                            <TextField
                              prefix=""
                              value={inputField.price}
                              label="Price"
                              id="price"
                              type="text"
                              name="price"
                              onChange={event => handleInputsChange(index, event)}
                            />
                            </FormLayout.Group>  
                            </FormLayout>
                        </Card>
                        </Fragment>
                      ))}
                    </div>
                </Form>
                <PageActions 
                      primaryAction={[
                        {
                          content: 'Save', 
                          onAction: () => {                            
                              const formData = new FormData();
                              for (let i = 0; i < inputFields.length; i++) {
                                formData.append('image_upload', inputFields[i].image_upload);
                              }    
                              const config = {
                                headers: {
                                    'content-type': 'multipart/form-data'
                                }
                              };
                              axios.post("/admin/file",formData,config)
                                .then((response) => {
                                    const metadat = [];
                                    var milliseconds = new Date().getTime();
                                    console.log(milliseconds);
                                    for (let j = 0; j < response.data.data.length; j++) {
                                      if(inputFields[j].price == ''){
                                        inputFields[j].price = 0;
                                      }
                                      metadat[j] = {
                                        "namespace": "transitions_lenses",
                                        "key": "transitions_"+milliseconds,
                                        "value": "{\"name\":\""+inputFields[j].name+"\",\"price\":\""+inputFields[j].price+"\",\"image\":\""+response.data.imagepath+response.data.data[j].filename+"\"}",
                                        "valueType": "JSON_STRING"
                                      }
                                    }
                                    const productmeta = {
                                      id: store.get('presc_item').id,
                                      "metafields": metadat
                                    }
                                    if(productmeta){
                                      handleSubmit({  
                                        variables: { productmeta: productmeta },                             
                                      });
                                    }
                                    setInputResponse(productmeta)  
                                }).catch((error) => {
                                });
                                
                          } 
                        } 
                      ]} 
                  />
              </Page>
            </Frame>
          );
        }}
      </Mutation>
                <TransitionsInputsdel />
      
    </>
  );
};
export default TransitionsInputs;


