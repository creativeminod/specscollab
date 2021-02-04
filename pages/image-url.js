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
  ButtonGroup
} from '@shopify/polaris';
const axios = require("axios");
const ImageUrl = () => {
  const [inputFields, setInputFields] = useState([
    { image_upload: null, price: '' }
  ]);

  const [url, setUrl] = useState([ null ]);

  const handleAddFields = () => {
    const values = [...inputFields];
    values.push({ image_upload: null, price: '' });
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
    } else {
      values[index].price = event.target.value;
    }
    setInputFields(values);
    const formData = new FormData();
    formData.append('image_upload',inputFields[0].image_upload);
    const config = {
          headers: {
              'content-type': 'multipart/form-data'
          }
      };
      axios.post("/admin/presfile",formData,config)
          .then((response) => {
            const values = [...url];
            setUrl(response.data.imageurl);
              alert("The file is successfully uploaded");
          }).catch((error) => {
      });
  };

  const handleSubmit = e => {

    
  };

  return (
    <>
    
    <Page title="Prescription Upload" description="desc">
      <Form >
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

                  </FormLayout.Group> 
                  <TextField
                        prefix=""
                        value={url}
                        label="Generated Url"
                        id="image_upload"
                        type="text"
                      />                    
                </FormLayout>
              </Card>
              </Fragment>
            ))}
          </div>
      </Form>
      
    </Page>
    </>
  );
};
export default ImageUrl;


