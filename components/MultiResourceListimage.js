import React, {useState} from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { EmptyState,Card,ResourceList, Stack, TextStyle, Thumbnail,ResourceItem } from '@shopify/polaris';
import store from 'store-js';
import { Redirect } from '@shopify/app-bridge/actions';
import { Context } from '@shopify/app-bridge-react';

export default function MultiResourceListimage() {
const GET_PRODUCTS_BY_ID = gql`
  query getProducts($multi_presc_ids: [ID!]!) {
    nodes(ids: $multi_presc_ids) {
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
  const [selectedItems, setSelectedItems] = useState([]);
  const twoWeeksFromNow = new Date(Date.now() + 12096e5).toDateString();
  const options = [...selectedItems];
  store.set('multi_ids',options);
  const emptyState = !store.get('multi_presc_ids');
  const img = 'https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg';
  return (
    <Query query={GET_PRODUCTS_BY_ID} variables={{ multi_presc_ids: store.get('multi_presc_ids') }}>
        {({ data, loading, error }) => {
          if (loading) return <div>Loading…</div>;
          if (error) return <div>{error.message}</div>;
            const emptyState1 = data.nodes;
            var productinvalid = false;
            emptyState1.forEach(function(entry) {
                if(entry === null){
                  productinvalid = true;
                }
            });
            if(productinvalid != true){

              return (
                <Card sectioned>
                  <ResourceList
                    showHeader
                    resourceName={{ singular: 'Product', plural: 'Products' }}
                    items={data.nodes}
                    selectedItems={selectedItems}
                    onSelectionChange={setSelectedItems}
                    selectable
                    renderItem={item => {
                      store.set(item.id, item); 
                      const media = (
                        <Thumbnail
                          source={
                            item.images.edges[0]
                              ? item.images.edges[0].node.originalSrc
                              : ''
                          }
                          alt={
                            item.images.edges[0]
                              ? item.images.edges[0].node.altText
                              : ''
                          }
                        />
                      );
                      const price = item.variants.edges[0].node.price;
                      return (
                        <ResourceList.Item
                          id={item.id}
                          media={media}
                          accessibilityLabel={`View details for ${item.title}`}
                          onAction={() => {
                            store.set(item.id, item);                        
                          }}
                        >
                          <Stack>
                            <Stack.Item fill>
                              <h3>
                                <TextStyle variation="strong">
                                  {item.title}
                                </TextStyle>
                              </h3>
                            </Stack.Item>
                            <Stack.Item>
                              <p>${price}</p>
                            </Stack.Item>
                            <Stack.Item>
                              <p>Expires on {twoWeeksFromNow} </p>
                            </Stack.Item>
                          </Stack>
                        </ResourceList.Item>
                      );
                    }}
                  />
                </Card>
              );
            }else{
              return (
              <div>
              </div>

              );
            }
          
        }}
      </Query>
  );
  
}
