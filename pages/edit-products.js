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
  ResourceList, 
  Stack, 
  TextStyle, 
  Thumbnail
} from '@shopify/polaris';
import store from 'store-js';
import gql from 'graphql-tag';
import { Mutation, Query } from 'react-apollo';
import React from "react";
import { Redirect } from '@shopify/app-bridge/actions';
import { Context } from '@shopify/app-bridge-react';

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
  query getProducts($ids: [ID!]!) {
    nodes(ids: $ids) {
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
        sun_prog_std: metafield(namespace: "sun_prog_std", key: "sun_prog_std") {
          id
          key
          namespace
          value
        }
        clr_sngvis_std: metafield(namespace: "clr_sngvis_std", key: "clr_sngvis_std") {
          id
          key
          namespace
          value
        }
        clr_progsiv_std: metafield(namespace: "clr_progsiv_std", key: "clr_progsiv_std") {
          id
          key
          namespace
          value
        }
        sun_prog_pri: metafield(namespace: "sun_prog_pri", key: "sun_prog_pri") {
          id
          key
          namespace
          value
        }
        sun_prog_pol: metafield(namespace: "sun_prog_pol", key: "sun_prog_pol") {
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

class EditProduct extends React.Component {
  static contextType = Context;

  state = {
    name: '',
    discount: '',
    standard: '0',
    standardId: '',
    polarized: '0',
    polarizedId: '',
    prizm: '0',
    prizmId: '',
    price: '',
    variantId: '',
    sun_prog_pri: '0',
    sun_prog_pol: '0',
    sun_prog_std: '0',
    sun_prog_stdId: '',
    clr_sngvis_std: '0',
    clr_progsiv_std: '0',
    clr_sngvis_stdId: '',
    clr_progsiv_stdId: '',
    sun_prog_polId: '',
    sun_prog_priId: '',
    proId: '',
    showToast: false,
    cats: [{name:"", age:""}],
    owner: "",
    description: ""
  };

  componentDidMount() {
    this.setState({ discount: this.itemToBeConsumed() });
  }
  handleValidation(){
    let fields = this.state.prizm;
    let errors = {};
    let formIsValid = true;
    if(this.state.prizm == '' 
      || this.state.polarized == '' 
      || this.state.prizm == ''
      || this.state.sun_prog_std == ''
      || this.state.sun_prog_pol == ''
      || this.state.sun_prog_pri == ''
      || this.state.clr_sngvis_std == ''
      || this.state.clr_progsiv_std == ''
      ){
       formIsValid = false;
    }
    
    return formIsValid;
  }
  render() {
    let {owner, description, cats} = this.state
    const { 
      name, 
      price, 
      discount, 
      variantId, 
      proId, 
      standard,
      standardId,
      polarized,
      polarizedId, 
      prizm,
      prizmId,
      sun_prog_pri,
      sun_prog_pol,
      sun_prog_std,
      sun_prog_stdId,
      clr_sngvis_std,
      clr_progsiv_std,
      clr_sngvis_stdId,
      clr_progsiv_stdId,
      sun_prog_polId,
      sun_prog_priId 
    } = this.state;
    const app = this.context;
    const redirectToProduct = () => {
      const redirect = Redirect.create(app);
      redirect.dispatch(
        Redirect.Action.APP,
        '/',
      );
    };
    return (
      <div>
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
              onDismiss={() => this.setState({ showToast: false })}
            />
          );
          if(showToast){
            redirectToProduct();
          }
          return (
            <Frame>
              <Page title={name} description="desc">
                <Layout>
                  {showToast}
                  <Layout.Section>
                    {showError}
                  </Layout.Section>
                  <Layout.Section>
                    <Form>
                      
                      <Card sectioned>
                        <FormLayout>
                          <Heading element="h3">Sunglasses > Single Vision</Heading>
                          
                          <TextField
                            prefix="$"
                            value={standard}
                            disabled={false}
                            onChange={this.handleChange('standard')}
                            label="Standard"
                            type="price"
                          />
                          <TextField
                            prefix="$"
                            value={polarized}
                            disabled={false}
                            label="Iridium (Mirrored)"
                            onChange={this.handleChange('polarized')}
                            type="price"
                          />
                          <TextField
                            prefix="$"
                            value={prizm}
                            disabled={false}
                            onChange={this.handleChange('prizm')}
                            label="Prizm Color Enhancing Optics"
                            type="price"
                          />

                          <Heading element="h3">Sunglasses > progressive</Heading>
                          
                          <TextField
                            prefix="$"
                            value={sun_prog_std}
                            disabled={false}
                            onChange={this.handleChange('sun_prog_std')}
                            label="Standard"
                            type="price"
                          />
                          <TextField
                            prefix="$"
                            value={sun_prog_pol}
                            disabled={false}
                            label="Iridium (Mirrored)"
                            onChange={this.handleChange('sun_prog_pol')}
                            type="price"
                          />
                          <TextField
                            prefix="$"
                            value={sun_prog_pri}
                            disabled={false}
                            onChange={this.handleChange('sun_prog_pri')}
                            label="Prizm Color Enhancing Optics"
                            type="price"
                          />
                          <Heading element="h3">Clear > Single Vision</Heading>
                          <TextField
                            prefix="$"
                            value={clr_sngvis_std}
                            disabled={false}
                            label="Standard"
                            onChange={this.handleChange('clr_sngvis_std')}
                            type="price"
                          />
                          <Heading element="h3">Clear > Progressive</Heading>
                          <TextField
                            prefix="$"
                            value={clr_progsiv_std}
                            disabled={false}
                            label="Standard"
                            onChange={this.handleChange('clr_progsiv_std')}
                            type="price"
                          />
                        </FormLayout>
                      </Card>
                      
                      <Query query={GET_PRODUCTS_BY_ID} variables={{ ids: store.get('ids') }}>
                        {({ data, loading, error }) => {
                          if (loading) return <div>Loading…</div>;
                          if (error) return <div>{error.message}</div>;

                          console.log(data.nodes[0]);
                          if (
                            data.nodes[0].standard 
                            && data.nodes[0].polarized 
                            && data.nodes[0].prizm 
                            && data.nodes[0].sun_prog_std  
                            && data.nodes[0].clr_sngvis_std  
                            && data.nodes[0].clr_progsiv_std  
                            && data.nodes[0].sun_prog_pri  
                            && data.nodes[0].sun_prog_pol 
                          ){
                            return (
                            <FormLayout>
                                <ResourceList
                                showHeader
                                resourceName={{ singular: 'Product', plural: 'Products' }}
                                items={data.nodes}
                                renderItem={item => {
                                  store.set('item', item);
                                }}
                              />
                              
                            <PageActions
                              
                              secondaryActions={[
                                {
                                  content: 'Update',
                                  onAction: () => {
                                    const productVariableInput = {
                                      id: variantId,
                                      price: discount,

                                    };
                                    const productmeta = {
                                      id: proId,
                                      "metafields": [                                      
                                      {
                                        "id":standardId,
                                        "namespace": "standard",
                                        "key": "standard",
                                        "value": standard,
                                        "valueType": "STRING"
                                      },
                                      {
                                        "id":polarizedId,
                                        "namespace": "polarized",
                                        "key": "polarized",
                                        "value": polarized,
                                        "valueType": "STRING"
                                      },
                                      {
                                        "id":prizmId,
                                        "namespace": "prizm",
                                        "key": "prizm",
                                        "value": prizm,
                                        "valueType": "STRING"
                                      },
                                      {
                                        "id":sun_prog_stdId,
                                        "namespace": "sun_prog_std",
                                        "key": "sun_prog_std",
                                        "value": sun_prog_std,
                                        "valueType": "STRING"
                                      },
                                      {
                                        "id":clr_sngvis_stdId,
                                        "namespace": "clr_sngvis_std",
                                        "key": "clr_sngvis_std",
                                        "value": clr_sngvis_std,
                                        "valueType": "STRING"
                                      },
                                      {
                                        "id":clr_progsiv_stdId,
                                        "namespace": "clr_progsiv_std",
                                        "key": "clr_progsiv_std",
                                        "value": clr_progsiv_std,
                                        "valueType": "STRING"
                                      },
                                      {
                                        "id":sun_prog_polId,
                                        "namespace": "sun_prog_pol",
                                        "key": "sun_prog_pol",
                                        "value": sun_prog_pol,
                                        "valueType": "STRING"
                                      },
                                      {
                                        "id":sun_prog_priId,
                                        "namespace": "sun_prog_pri",
                                        "key": "sun_prog_pri",
                                        "value": sun_prog_pri,
                                        "valueType": "STRING"
                                      }
                                      ]
                                    }
                                    if(this.handleValidation()){
                                      handleSubmit({
                                        variables: { input: productVariableInput, productmeta: productmeta },
                                      });
                                    }else{
                                      alert('Please enter all input fields');
                                    }
                                  }
                                }
                              ]}
                             
                            />
                            </FormLayout>
                            );
                          }else{

                            return (
                            <FormLayout>
                                <ResourceList
                                showHeader
                                resourceName={{ singular: 'Product', plural: 'Products' }}
                                items={data.nodes}
                                renderItem={item => {
                                  store.set('item', item);
                                }}
                              />

                            <PageActions primaryAction={[
                                {
                                  content: 'Save',
                                  onAction: () => {
                                    const productVariableInput = {
                                      id: variantId,
                                      price: discount,

                                    };

                                    if(store.get('item').standard != null){
                                      var standardproductmeta = {
                                        "id": store.get('item').standard.id,
                                        "namespace": "standard",
                                        "key": "standard",
                                        "value": standard,
                                        "valueType": "STRING"
                                      };
                                    }else{
                                      var standardproductmeta = {
                                        "namespace": "standard",
                                        "key": "standard",
                                        "value": standard,
                                        "valueType": "STRING"
                                      };
                                    } 

                                    if(store.get('item').polarized != null){
                                      var polarizedproductmeta = {
                                        "id": store.get('item').polarized.id,
                                        "namespace": "polarized",
                                        "key": "polarized",
                                        "value": polarized,
                                        "valueType": "STRING"
                                      };
                                    }else{
                                      var polarizedproductmeta = {
                                        "namespace": "polarized",
                                        "key": "polarized",
                                        "value": polarized,
                                        "valueType": "STRING"
                                      };
                                    }

                                    if(store.get('item').prizm != null){
                                      var prizmproductmeta = {
                                        "id": store.get('item').prizm.id,
                                        "namespace": "prizm",
                                        "key": "prizm",
                                        "value": prizm,
                                        "valueType": "STRING"
                                      };
                                    }else{
                                      var prizmproductmeta = {
                                        "namespace": "prizm",
                                        "key": "prizm",
                                        "value": prizm,
                                        "valueType": "STRING"
                                      };
                                    }

                                    if(store.get('item').sun_prog_std != null){
                                      var sun_prog_stdproductmeta = {
                                        "id": store.get('item').sun_prog_std.id,
                                        "namespace": "sun_prog_std",
                                        "key": "sun_prog_std",
                                        "value": sun_prog_std,
                                        "valueType": "STRING"
                                      };
                                    }else{
                                      var sun_prog_stdproductmeta = {
                                        "namespace": "sun_prog_std",
                                        "key": "sun_prog_std",
                                        "value": sun_prog_std,
                                        "valueType": "STRING"
                                      };
                                    }

                                    if(store.get('item').clr_sngvis_std != null){
                                      var clr_sngvis_stdproductmeta = {
                                        "id": store.get('item').clr_sngvis_std.id,
                                        "namespace": "clr_sngvis_std",
                                        "key": "clr_sngvis_std",
                                        "value": clr_sngvis_std,
                                        "valueType": "STRING"
                                      };
                                    }else{
                                      var clr_sngvis_stdproductmeta = {
                                        "namespace": "clr_sngvis_std",
                                        "key": "clr_sngvis_std",
                                        "value": clr_sngvis_std,
                                        "valueType": "STRING"
                                      };
                                    }

                                    if(store.get('item').clr_progsiv_std != null){
                                      var clr_progsiv_stdproductmeta = {
                                        "id": store.get('item').clr_progsiv_std.id,
                                        "namespace": "clr_progsiv_std",
                                        "key": "clr_progsiv_std",
                                        "value": clr_progsiv_std,
                                        "valueType": "STRING"
                                      };
                                    }else{
                                      var clr_progsiv_stdproductmeta = {
                                        "namespace": "clr_progsiv_std",
                                        "key": "clr_progsiv_std",
                                        "value": clr_progsiv_std,
                                        "valueType": "STRING"
                                      };
                                    }

                                    if(store.get('item').sun_prog_pol != null){
                                      var sun_prog_polproductmeta = {
                                        "id": store.get('item').sun_prog_pol.id,
                                        "namespace": "sun_prog_pol",
                                        "key": "sun_prog_pol",
                                        "value": sun_prog_pol,
                                        "valueType": "STRING"
                                      };
                                    }else{
                                      var sun_prog_polproductmeta = {
                                        "namespace": "sun_prog_pol",
                                        "key": "sun_prog_pol",
                                        "value": sun_prog_pol,
                                        "valueType": "STRING"
                                      };
                                    }

                                    if(store.get('item').sun_prog_pri != null){
                                      var sun_prog_priproductmeta = {
                                        "id": store.get('item').sun_prog_pri.id,
                                        "namespace": "sun_prog_pri",
                                        "key": "sun_prog_pri",
                                        "value": sun_prog_pri,
                                        "valueType": "STRING"
                                      };
                                    }else{
                                      var sun_prog_priproductmeta = {
                                        "namespace": "sun_prog_pri",
                                        "key": "sun_prog_pri",
                                        "value": sun_prog_pri,
                                        "valueType": "STRING"
                                      };
                                    }
                                    
                                    const productmeta = {
                                      id: proId,
                                      "metafields": [standardproductmeta, polarizedproductmeta, prizmproductmeta,sun_prog_stdproductmeta, clr_sngvis_stdproductmeta,clr_progsiv_stdproductmeta, sun_prog_polproductmeta,sun_prog_priproductmeta ]
                                    }
                                  
                                    if(this.handleValidation()){
                                      handleSubmit({
                                        variables: { input: productVariableInput, productmeta: productmeta },
                                      });
                                    }else{
                                      alert('Please enter all input fields');
                                    }
                                  }
                                }
                              ]} />
                             </FormLayout>
                            );
                          } 
                          
                        }}
                      </Query>
                      
                    </Form>
                  </Layout.Section>
                </Layout>
              </Page>
            </Frame>
          );
        }}
      </Mutation>
      
      </div>
    );
  }

  handleChange = (field) => {
    return (value) => this.setState({ [field]: value });
  };

  itemToBeConsumed = () => {
    const item = store.get('item');
    const name = item.title;
    const price = item.variants.edges[0].node.price;
    const variantId = item.variants.edges[0].node.id;
    const proId = item.id;
    const discounter = price * 0.1;
    
    this.setState({ name, price, variantId, proId});

    if(item.standard != null ){
      const standard = item.standard.value;
      const standardId = item.standard.id;
      this.setState({ standard, standardId});
    }

    if(item.sun_prog_std != null){
      const sun_prog_std = item.sun_prog_std.value;
      const sun_prog_stdId = item.sun_prog_std.id;
      this.setState({ sun_prog_std, sun_prog_stdId});
    }

    if(item.clr_sngvis_std != null){
      const clr_sngvis_std = item.clr_sngvis_std.value;
      const clr_sngvis_stdId = item.clr_sngvis_std.id;
      this.setState({ clr_sngvis_std, clr_sngvis_stdId});

    }

    if(item.clr_progsiv_std != null){
      const clr_progsiv_std = item.clr_progsiv_std.value;
      const clr_progsiv_stdId = item.clr_progsiv_std.id;
      this.setState({ clr_progsiv_std, clr_progsiv_stdId});

    }

    if(item.polarized != null){
      const polarized = item.polarized.value;
      const polarizedId = item.polarized.id;
      this.setState({ polarized, polarizedId});
    }      
      
    if (item.sun_prog_pol != null) {
      const sun_prog_pol = item.sun_prog_pol.value;
      const sun_prog_polId = item.sun_prog_pol.id;
      this.setState({ sun_prog_pol, sun_prog_polId});

    }

    if (item.sun_prog_pri != null) {
      const sun_prog_pri = item.sun_prog_pri.value;
      const sun_prog_priId = item.sun_prog_pri.id;
      this.setState({ sun_prog_pri, sun_prog_priId});

    }
      
    if (item.prizm != null) {
      const prizm = item.prizm.value;
      const prizmId = item.prizm.id;
      this.setState({ prizm, prizmId});

    }

    
   
    return (price - discounter).toFixed(2);
  };
}

export default EditProduct;