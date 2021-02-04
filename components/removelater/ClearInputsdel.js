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
        clear_lenses: metafields(namespace: "clear_lenses", first: 10){
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

const ClearInputsdel = () => {
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
    }else if(event.target.name === "name"){
      values[index].name = event.target.value;
    } else {
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
        mutation={DELETE_METAFIELD}
      >
        {(handleSubmit, {error, data}) => {
          const showError = error && (
            <Banner status="critical">{error.message}</Banner>
          );
          const showToast = data && data.metafieldDelete && (
            <Toast
              content="Sucessfully deleted"
              onDismiss={showToast}
            />
          );
          if(showToast){
            window.location.reload();
          }
          return (
            <Frame>
              <Page title="Images" description="desc">
               {showToast}
                <Form onSubmit={handleSubmit}>
                  <div className="form-row">

                      {inputFields.map((inputField, index) => (
                        <Fragment key={`${inputField}~${index}`}>
                        <Card sectioned>
                          <FormLayout>
                            <FormLayout.Group>
                              <Query query={GET_PRODUCTS_BY_ID} variables={{ presc_ids: store.get('presc_ids') }}>
                                {({ data, loading, error }) => {
                                  if (loading) return <div>Loading…</div>;
                                  if (error) return <div>{error.message}</div>;
                                  if(data.nodes[0].clear_lenses){
                                    const clr = data.nodes[0].clear_lenses.edges.length;
                                    let clrarray = [];
                                    for (let i = 0; i < clr; i++) {
                                      const imag = data.nodes[0].clear_lenses.edges[i].node.value.split('"');
                                      console.log(imag);
                                        clrarray.push(<Thumbnail source={imag[11]} alt="Black choker necklace"/>);
                                        clrarray.push(<DisplayText size="small"> {imag[3]}($ {imag[7]})</DisplayText>);                    
                                        clrarray.push(

                                          <PageActions primaryAction={[{
                                            content: 'Delete', 
                                            onAction: () => {
                                                const productmetadel = {                                                  
                                                    "id": data.nodes[0].clear_lenses.edges[i].node.id
                                                }
                                                handleSubmit({
                                                  variables: { 
                                                    productmetadel: productmetadel 
                                                  }, 
                                                }); 
                                              } 
                                            } 
                                          ]} />);                        
                                    }
                                    return(
                                        <Card sectioned> 
                                          <Scrollable shadow style={{height: '300px'}}>
                                            <FormLayout>

                                              <FormLayout.Group>
                                              <Heading> Image</Heading>
                                              <Heading> Name</Heading>
                                              <Heading> Action</Heading>
                                              </FormLayout.Group>               
                                              <FormLayout.Group>               
                                                {clrarray} 
                                              </FormLayout.Group>
                                            </FormLayout>
                                          </Scrollable>
                                      </Card>
                                      );
                                  }else{
                                    return(
                                      <div>
                                      </div>
                                    );
                                  }
                                }}
                              </Query>
                            
                            </FormLayout.Group>
                                   
                            </FormLayout>
                        </Card>
                        </Fragment>
                      ))}
                    </div>
                </Form>
              </Page>
            </Frame>
          );
        }}
      </Mutation>
      
    </>
  );
};
export default ClearInputsdel;


