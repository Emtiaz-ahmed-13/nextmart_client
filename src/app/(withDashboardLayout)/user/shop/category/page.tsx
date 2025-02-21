/* eslint-disable @typescript-eslint/no-unused-vars */
import ManageCategoris from "@/components/modules/shop/category";
import { getAllCategories } from "@/services/Category";


const ProductCategoryPage = async () => {
  const {data,meta} = await getAllCategories();
 

  return (
    <div>
      <ManageCategoris categories={data} />

    </div>
  
  );
};

export default ProductCategoryPage;