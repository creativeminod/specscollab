import React, {useState} from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Card,ResourceList, Stack, TextStyle, Thumbnail,ResourceItem } from '@shopify/polaris';
import store from 'store-js';
import { Redirect } from '@shopify/app-bridge/actions';
import { Context } from '@shopify/app-bridge-react';

export default function MultiProductList() {
  const GET_PRODUCTS_BY_ID = gql`
    query getProducts($presc_ids: [ID!]!) {
      nodes(ids: $presc_ids) {
        ... on Product {
          title
          handle
          descriptionHtml
          id
          sg_sv_std_np: metafield(namespace: "sg_sv_std_np", key: "sg_sv_std_np") {
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
  
  return (
    <Query query={GET_PRODUCTS_BY_ID} variables={{ ids: store.get('ids') }}>
        {({ data, loading, error }) => {
          if (loading) return <div>Loading…</div>;
          if (error) return <div>{error.message}</div>;
          
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
        }}
      </Query>
  );
  
}
