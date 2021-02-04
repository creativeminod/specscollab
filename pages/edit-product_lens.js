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

const GET_PRODUCTS_BY_ID = gql`
  query getProducts($presc_ids: [ID!]! $lens_edit:String!) {
    nodes(ids: $presc_ids) {
      ... on Product {
        title
        handle
        descriptionHtml
        id
        sg_sv_std_np: metafield(namespace: "sg_sv_std_np", key:$lens_edit){
          id
          namespace
          key
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
class EditProduct_lens extends React.Component {
  static contextType = Context;
  state = {
    idx_upload: '',
    image_url:'',
    name:'',
    price:'',
    url:'',
    showToast: false,
  };

  handleInputsChange = (field) => {
    return (value) => this.setState({ [field]: value });
  };
  componentDidMount() {
    this.setState({
      idx:store.get('lens_edit-id'),
      idx_key:store.get('lens_edit-key'),
      idx_namespace:store.get('lens_edit-namespace'),
      image_url:store.get('lens_edit-Image_Url'),
      name:store.get('lens_edit-name'),
      price:store.get('lens_edit-price'),
      url:store.get('lens_edit-video_link')
    });
  }
 
  render() {
    const {
      idx,
      idx_namespace,
      idx_key,
      image_url,
      name,
      price,
      url
    } = this.state;
    const app = this.context;
    const redirectToProduct = () => {
      const redirect = Redirect.create(app);
      redirect.dispatch(
        Redirect.Action.APP,
        '/edit-productslens',
      );
    };
    return (
      <div>

        <Mutation mutation={ADD_METAFIELD} >
          {(handleSubmit, {error, data}) => {
            const showError = error && (
              <Banner status="critical">{error.message}</Banner>
            );
            const showToast =  data && (
              <Toast
                content="Sucessfully Updated"
                onDismiss={() => this.setState({ showToast: false })}
              />
            );
            if(showToast){
              redirectToProduct();
            }
            return (
              <Frame>
                {showToast}
                <Page title="Edit Lens" description="desc">
                  <Card sectioned>
                    <FormLayout>
                      <FormLayout.Group>
                        <Query query={GET_PRODUCTS_BY_ID} variables={{ presc_ids: store.get('presc_ids'),lens_edit: store.get('lens_edit-key') }}>
                                {({ data, loading, error }) => {
                                  if (loading) return <div>Loading…</div>;
                                  if (error) return <div>{error.message}</div>;
                                  if (data.nodes[0]){
                                    
                                       
                                    const clr = data;
                                    
                                    return(
                                      <div>
                                        <Card sectioned>
                                          <Thumbnail source={image_url} alt="Black choker necklace"/>
                                        </Card>
                                        <Card sectioned>
                                          <TextField
                                            prefix=""
                                            value={idx_key}
                                            label="Lens Key"
                                            id="idx_key"
                                            type="text"
                                            placeholder="Optional"
                                            name="idx_key"
                                            readOnly={true}
                                          />
                                          <TextField
                                            prefix=""
                                            value={name}
                                            label="Lens Name"
                                            id="name"
                                            type="text"
                                            name="name"
                                            onChange={this.handleInputsChange('name')}
                                          />               
                                          <TextField
                                            prefix=""
                                            value={price}
                                            label="Price"
                                            id="price"
                                            type="number"
                                            name="price"
                                            onChange={this.handleInputsChange('price')}
                                          />
                                          <TextField
                                            prefix=""
                                            value={url}
                                            label="Video Link"
                                            id="url"
                                            type="url"
                                            name="url"
                                            onChange={this.handleInputsChange('url')}
                                          />
                                        <PageActions 
                                        secondaryActions={[
                                          {
                                            content: 'Update', 
                                            onAction: () => { 
                                                  const metadat = {
                                                    "id":store.get('lens_edit-id'),
                                                    "namespace": store.get('lens_edit-namespace'),
                                                    "key": store.get('lens_edit-key'),
                                                    "value": "{\"name\":\""+this.state.name+"\",\"price\":\""+this.state.price+"\",\"image\":\""+store.get('lens_edit-Image_Url')+"\",\"url\":\""+this.state.url+"\"}",
                                                    "valueType": "JSON_STRING"
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
                                                  
                                                                           
                                                
                                                
                                            } 
                                          } 
                                        ]}
                                        />
                                        </Card>
                                        
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
export default EditProduct_lens;