import { createContext, useState, ReactElement, useEffect } from "react";

export type ProductType = {
  id: number;
  sku: string;
  name: string;
  price: number;
  category: string;
};

export type UseProductsContextType = {
  products: ProductType[];
  getProduct: (id: number) => ProductType | undefined;
  getFromTheSameCategory: (product: ProductType) => ProductType[];
};

type ChildrenType = { children?: ReactElement | ReactElement[] | undefined };

// const initState: ProductType[] = [];

const initState: ProductType[] = [
  {
    id: 1,
    sku: "item0001",
    name: "Widget",
    price: 9.99,
    category: "cat001"
  },
  {
    id: 2,
    sku: "item0002",
    name: "Premium Widget",
    price: 19.99,
    category: "cat002"
  },
  {
    id: 3,
    sku: "item0003",
    name: "Deluxe Widget",
    price: 29.99,
    category: "cat001"
  }
];

const initContextState: UseProductsContextType = {
  products: [],
  getProduct: (id: number) => {
    return {
      id: 0,
      sku: "",
      name: "",
      price: 0,
      category: ""
    };
  },
  getFromTheSameCategory: (product: ProductType) => []
};

const ProductsContext = createContext<UseProductsContextType>(initContextState);

export const ProductsProvider = ({ children }: ChildrenType): ReactElement => {
  const [products, setProducts] = useState<ProductType[]>(initState);
  initState;

  const getProduct = (id: number) => {
    return products.find(product => product.id === id);
  };

  const getFromTheSameCategory = (product1: ProductType) => {
    return products.filter(
      product => product.id !== product1.id && product.category === product1.category
    );
  };

  // useEffect(() => {
  //   const fetchProducts = async (): Promise<ProductType[]> => {
  //     const data = await fetch("http://localhost:3500/products")
  //       .then(res => res.json())
  //       .catch(err => {
  //         if (err instanceof Error) console.log(err.message);
  //       });

  //     return data;
  //   };

  //   fetchProducts().then(products => setProducts(products));
  // }, []);

  return (
    <ProductsContext.Provider value={{ products, getProduct, getFromTheSameCategory }}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsContext;
