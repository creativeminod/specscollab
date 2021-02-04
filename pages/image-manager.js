import { EmptyState, Layout, Page, TextStyle } from '@shopify/polaris';
import { ResourcePicker, TitleBar } from '@shopify/app-bridge-react';
import store from 'store-js';
import ResourceListWithProducts from '../components/ResourceListimage';

const img = 'https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg';

class ImageManager extends React.Component {
  state = { open: false };
  render() {
    const emptyState = !store.get('presc_ids');
    return (
      <Page>
        <TitleBar
          primaryAction={{
            content: 'Select products',
            onAction: () => this.setState({ open: true }),
          }}
        />
        <ResourcePicker
          resourceType="Product"
          showVariants={false}
          open={this.state.open}
          onSelection={(resources) => this.handleSelection(resources)}
          onCancel={() => this.setState({ open: false })}
        />
        {emptyState ? (
        <Layout>
          <EmptyState
            heading="Select product to add lens images"
            image={img}
          >
          </EmptyState>
        </Layout>
        ) : (
          <ResourceListWithProducts />
        )}
      </Page>
    );
  }
  handleSelection = (resources) => {
    const idsFromResources = resources.selection.map((product) => product.id);
    this.setState({ open: false });
    store.set('presc_ids', idsFromResources);
  };
}

export default ImageManager;