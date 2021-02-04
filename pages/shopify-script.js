import {
  Button,
  Card,
  Form,
  Frame,
  FormLayout,
  Layout,
  Page,
  SettingToggle,
  Stack,
  TextField,
  TextStyle,
  PageActions,
  Banner,
  Heading
} from '@shopify/polaris';
import store from 'store-js';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import React from "react";
import { useMutation } from '@apollo/react-hooks';

const Delete_SCRIPTTAGS = gql`
mutation scriptTagDelete($id: ID!) {
  scriptTagDelete(id: $id) {
    deletedScriptTagId
    userErrors {
      field
      message
    }
  }
}`;

const WRITE_SCRIPTTAGS = gql`
mutation scriptTagCreate($input: ScriptTagInput!) {
  scriptTagCreate(input: $input) {
    scriptTag {
      id
    }
    userErrors {
      field
      message
    }
  }
}`;

class AnnotatedLayout extends React.Component {
  state = {
    enabled: false,
    singleurl: '',
    singleurlid: '',
  };

  render() {
    const { enabled,singleurl,singleurlid } = this.state;
    const contentStatus = enabled ? 'Disable' : 'Enable';
    const textStatus = enabled ? 'enabled' : 'disabled';
    return (
      <div>
      <Mutation
        mutation={WRITE_SCRIPTTAGS}
      >
        {(handleSubmit, {error, data}) => {
        	console.log('data',data);
          const showError = error && (
            <Banner status="critical">{error.message}</Banner>
          );
          const showToast = data && data.productUpdate && (
            <Toast
              content="Sucessfully updated"
              onDismiss={() => this.setState({ showToast: false })}
            />
          );
    	    return (
    		    <Frame>
    		      <Page>
    		        <Layout>
    		          
    		          <Layout.AnnotatedSection
    		            title="Enable Script"
    		            description="Temporarily disable all Sample App price updates"
    		          >
    		            <SettingToggle
    		              action={{
    		                content: contentStatus,
    		                onAction: this.insertimage,
    		              }}
    		              enabled={enabled}
    		            >
    		              This setting is{' '}
    		              <TextStyle variation="strong">{textStatus}</TextStyle>.
    		            </SettingToggle>
    		          </Layout.AnnotatedSection>
    		          <Layout.AnnotatedSection
    		            title="Save Setting"
    		            description="Add a product to Sample App, it will automatically be discounted."
    		          >
    		            <Card sectioned>
    		              <Form>
    		                <Card sectioned>
                            <FormLayout>
                              <TextField
                                  prefix=""
                                  value={singleurl}
                                  label="Enter Url(This will add the script in store)"
                                  onChange={this.handleChange('singleurl')}
                                  type="text"
                                />
                            </FormLayout>
                          </Card>
    		                <PageActions
                            primaryAction={[
                              {
                                content: 'Save',
                                onAction: () => {
                                  const input = {
                                    "src": singleurl, 
        							              "displayScope": "ALL" 
                                  };
                                  
                                  handleSubmit({
                                    variables: {  input: input }
                                  });
                                }
                              }
                            ]}
                                                  
                          />
    		              </Form>
    		            </Card>
    		          </Layout.AnnotatedSection>
    		        </Layout>
    		      </Page>
            </Frame>
    	    );
	       }}
	    </Mutation>
      <Mutation
        mutation={Delete_SCRIPTTAGS}
      >
        {(handleSubmit, {error, data}) => {
          console.log('data',data);
          const showError = error && (
            <Banner status="critical">{error.message}</Banner>
          );
          const showToast = data && data.productUpdate && (
            <Toast
              content="Sucessfully updated"
              onDismiss={() => this.setState({ showToast: false })}
            />
          );
          return (
            <Frame>
              <Page>
                <Layout>
                  <Layout.AnnotatedSection
                    title="Delete Script"
                    description=""
                  >
                    <Card sectioned>
                      <Form>
                        <Card sectioned>
                            <FormLayout>
                              <TextField
                                  prefix=""
                                  value={singleurlid}
                                  label="Enter ID(This will delete the script from store)"
                                  onChange={this.handleChange('singleurlid')}
                                  type="text"
                                />
                            </FormLayout>
                          </Card>
                        <PageActions
                            primaryAction={[
                              {
                                content: 'Save',
                                onAction: () => {
                                  const id = "gid://shopify/ScriptTag/"+singleurlid;
                                  console.log(id);
                                  handleSubmit({
                                    variables: {  id: id }
                                  });
                                }
                              }
                            ]}
                                                  
                          />
                      </Form>
                    </Card>
                  </Layout.AnnotatedSection>
                </Layout>
              </Page>
            </Frame>
          );
         }}
      </Mutation>
      </div>
	  );
  }

  handleSubmit = () => {
    this.setState({
      discount: this.state.discount,
    });
    if(this.state.enabled == true){
    	console.log('submission', this.state);
    }
  };

  getCollections = () => {
    var fetchUrl = "/api/78719942723";
    var method = "GET";
    fetch(fetchUrl, { method: method })
    .then(response => response.json())
    .then(json => console.log(json))
  };

  insertimage = () => {
    var fetchUrl = "/user/4494858354755";
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: { "image": {
          "src": "https://png.pngtree.com/png-clipart/20190614/original/pngtree-link-glyph-black-icon-png-image_3755335.jpg"
        } }
    };
    fetch(fetchUrl, requestOptions)
    .then(response => response.json())
    .then(json => console.log(json))
  };

  

  handleChange = (field) => {
    return (value) => this.setState({ [field]: value });
  };

  handleToggle = () => {
    this.setState(({ enabled }) => {
      return { enabled: !enabled };
    });
  };
}

export default AnnotatedLayout;