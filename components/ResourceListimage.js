import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Layout, EmptyState, Card,ResourceList, Stack, TextStyle, Thumbnail, } from '@shopify/polaris';
import store from 'store-js';
import { Redirect } from '@shopify/app-bridge/actions';
import { Context } from '@shopify/app-bridge-react';

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

class ResourceListWithProducts extends React.Component {
  static contextType = Context;
  render() {
    const app = this.context;
    const redirectToProduct = () => {
      const redirect = Redirect.create(app);
      redirect.dispatch(
        Redirect.Action.APP,
        '/edit-productslens',
      );
    };
    const twoWeeksFromNow = new Date(Date.now() + 12096e5).toDateString();
    const img = 'https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg';
    return (
      
      <Query query={GET_PRODUCTS_BY_ID} variables={{ presc_ids: store.get('presc_ids') }}>
        {({ data, loading, error }) => {
          if (loading) return <div>Loading…</div>;
          if (error) return <div>{error.message}</div>;
          console.log(data);
          const emptyState1 = data.nodes;
          var productinvalid = false;
          emptyState1.forEach(function(entry) {
              if(entry === null){
                productinvalid = true;
              }
          });
          if(productinvalid != true){
            return (
              <Card>
                <ResourceList
                  showHeader
                  resourceName={{ singular: 'Product', plural: 'Products' }}
                  items={data.nodes}
                  renderItem={presc_item => {
                    const media = (
                      <Thumbnail
                        source={
                          presc_item.images.edges[0]
                            ? presc_item.images.edges[0].node.originalSrc
                            : ''
                        }
                        alt={
                          presc_item.images.edges[0]
                            ? presc_item.images.edges[0].node.altText
                            : ''
                        }
                      />
                    );
                    const price = presc_item.variants.edges[0].node.price;
                    return (
                      <ResourceList.Item
                        id={presc_item.id}
                        media={media}
                        accessibilityLabel={`View details for ${presc_item.title}`}
                        onClick={() => {
                          store.set('presc_item', presc_item);
                          store.set('presc_ids', presc_item.id);
                          redirectToProduct();
                        }}
                      >
                        <Stack>
                          <Stack.Item fill>
                            <h3>
                              <TextStyle variation="strong">
                                {presc_item.title}
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
              <EmptyState image={img} fullWidth={true}  heading="The product has been deleted or invalid, Please select a new product to continue."> </EmptyState>
            );
          }
          
        }}
      </Query>
    );
  }
}

export default ResourceListWithProducts;