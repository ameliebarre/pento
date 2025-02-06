import DesignerFocus from '@/components/shared/designer-focus';
import ProductList from '@/components/shared/product/product-list';
import { getLatestProducts } from '@/lib/actions/product.actions';

const Homepage = async () => {
  const latestProducts = await getLatestProducts();

  return (
    <>
      <ProductList data={latestProducts} title='Catalog' />
      <DesignerFocus />
    </>
  );
};

export default Homepage;
