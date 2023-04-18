import { useMemo } from "react";
import { ProductType } from "../../context/ProductsProvider";
import useProducts from "../../hooks/useProducts";
import { StyledAddToCartButton } from "../AddToCartButton";

const ProductSimilar = ({ product }: { product: ProductType }) => {
  const { getFromTheSameCategory } = useProducts();
  const similarProducts = useMemo(() => getFromTheSameCategory(product), [product]);

  console.log("similar products", similarProducts);

  return (
    <div className="similar-products">
      <h2>Similar products</h2>
      <div className="similar-products__list">
        {similarProducts.map(product => (
          <div className="similar-product">
            <img src={new URL(`../../images/${product.sku}.jpg`, import.meta.url).href} className="similar-product__image"/>
            <h3>{product.name}</h3>
            <StyledAddToCartButton product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductSimilar;
