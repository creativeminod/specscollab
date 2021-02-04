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
import PolarizedInputsIridiumdel from './PolarizedInputsIridiumdel';

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
        sg_pr_ir_p: metafield(namespace: "sg_pr_ir_p", key: "sg_pr_ir_p") {
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

const PolarizedInputsIridium = () => {
  const [inputFields, setInputFields] = useState([
    { name:'', image_upload: null, price: '', url: '',idx_upload:'',idx_key:'',image_url:'' }
  ]);

  const [inputResponse, setInputResponse] = useState([
    { name:'', image_upload: null, price: null, url: '',idx_upload:'',idx_key:'',image_url:'' }
  ]);

  const handleAddFields = () => {
    const values = [...inputFields];
    values.push({ name:'', image_upload: null, price: '', url:'',idx_upload:'',idx_key:'',image_url:'' });
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
    }else if (event.target.name === "url") {
      values[index].url = event.target.value;
    }else if (event.target.name === "idx_upload"){
      values[index].idx_upload = event.target.value;
    }else if (event.target.name === "idx_key"){
      values[index].idx_key = event.target.value;
    }else if (event.target.name === "image_url"){
      values[index].image_url = event.target.value;
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
           
              <Page title="Sunglass -> SINGLE VISION -> Standard (Non-Polarized)" description="desc">
                <Form onSubmit={handleSubmit}>
                  <div className="form-row">

                      {inputFields.map((inputField, index) => (
                        <Fragment key={`${inputField}~${index}`}>
                        <Card sectioned>
                          <FormLayout>
                            <FormLayout.Group>
                              <>
                              <Card sectioned>
                                <Card sectioned>
                                  <TextField
                                    prefix=""
                                    value={inputField.image_upload}
                                    label="Image Upload"
                                    id="image_upload"
                                    type="file"
                                    name="image_upload"
                                    onChange={event => handleInputsChange(index, event)}
                                  />  
                                  <p>or</p>
                                  <TextField
                                    prefix=""
                                    value={inputField.image_url}
                                    label="Direct Image url"
                                    id="image_url"
                                    type="url"
                                    name="image_url"
                                    onChange={event => handleInputsChange(index, event)}
                                  />  
                                </Card>
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
                                  type="number"
                                  name="price"
                                  onChange={event => handleInputsChange(index, event)}
                                />
                                <TextField
                                  prefix=""
                                  value={inputField.url}
                                  label="Video Link"
                                  id="url"
                                  type="url"
                                  name="url"
                                  onChange={event => handleInputsChange(index, event)}
                                />
                              </Card>
                              </>
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
                          content: 'Insert', 
                          onAction: () => {
                            if(inputFields[0].image_url != ''){
                                var milliseconds = new Date().getTime();
                                const metadat = {
                                  "namespace": "sg_pr_ir_p",
                                  "key": "sg_pr_ir_p_"+milliseconds,
                                  "value": "{\"name\":\""+inputFields[0].name+"\",\"price\":\""+inputFields[0].price+"\",\"image\":\""+inputFields[0].image_url+"\",\"url\":\""+inputFields[0].url+"\"}",
                                  "valueType": "JSON_STRING"
                                }
                                const productmeta = {
                                  id: store.get('presc_item').id,
                                  "metafields": metadat
                                }
                                console.log(productmeta);
                                if(productmeta){
                                  handleSubmit({  
                                    variables: { productmeta: productmeta },                             
                                  });
                                }
                                setInputResponse(productmeta) 
                            }else{                               
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
                                        "namespace": "sg_pr_ir_p",
                                        "key": "sg_pr_ir_p_"+milliseconds,
                                        "value": "{\"name\":\""+inputFields[j].name+"\",\"price\":\""+inputFields[j].price+"\",\"image\":\""+response.data.imagepath+response.data.data[j].filename+"\",\"url\":\""+inputFields[j].url+"\"}",
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
                        } 
                      ]}
                      
                      
                  />
              </Page>
            </Frame>
           
          );
        }}
      </Mutation>
                <PolarizedInputsIridiumdel />
      
    </>
  );
};
export default PolarizedInputsIridium;


