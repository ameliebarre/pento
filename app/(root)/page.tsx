import CategoryList from '@/components/shared/category-list';
import DesignerFocus from '@/components/shared/designer-focus';
import HeroSection from '@/components/shared/hero-section';
import ProductList from '@/components/shared/product/product-list';
import { getAllCategories } from '@/lib/actions/category.actions';

const Homepage = async () => {
  const categories = await getAllCategories();

  return (
    <>
      <HeroSection />
      <ProductList />
      <CategoryList categories={categories} />
      <DesignerFocus />
    </>
  );
};

export default Homepage;
