import { ProductType } from "../../context/ProductsProvider";

type PropsType = Pick<ProductType, "sku">;

const ProductImage = ({ sku }: PropsType) => {
  const img: string = new URL(`../../images/${sku}.jpg`, import.meta.url).href;
  return (
    <div className="img-wrapper">
      <img src={img} className="product-img" />
    </div>
  );
};

export default ProductImage;
