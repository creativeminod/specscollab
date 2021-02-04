import { EmptyState, Layout, Page, TextStyle,Card,Tabs } from '@shopify/polaris';
import { ResourcePicker, TitleBar } from '@shopify/app-bridge-react';
import store from 'store-js';
import ResourceListWithProducts from '../components/ResourceListimage';
import MultiResourceListimage from '../components/MultiResourceListimage';

const img = 'https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg';

class MultiResourceListimageEmpty extends React.Component {
  state = { open: false };
  render() {
    const emptyState = !store.get('multi_presc_ids');

    return (
   
      <div>
      <TitleBar
          title="Sample App"
          primaryAction={{
          content: 'Select products',
          onAction: () => this.setState({ open: true }),
        }} />
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
          >
          </EmptyState>
        </Layout>
        ) : (
          <Page title="Select products to add Lens Images">
            <Card>
              <MultiResourceListimage />
            </Card>
          </Page>
        )}
        
     

    </div>

    );
  }
  handleSelection = (resources) => {
    const idsFromResources = resources.selection.map((product) => product.id);
    this.setState({ open: false });
    store.set('multi_presc_ids', idsFromResources);
  };
}

export default MultiResourceListimageEmpty;