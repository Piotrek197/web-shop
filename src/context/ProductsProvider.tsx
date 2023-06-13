import { createContext, useState, ReactElement, useEffect } from "react";

export type ProductType = {
  id: number;
  sku: string;
  name: string;
  price: number;
  category: string;
};

export type UseProductsContextType = {
  products: {[key: string]: ProductType[]};
  getProduct: (id: number) => ProductType | undefined;
  getFromTheSameCategory: (product: ProductType) => ProductType[];
};

type ChildrenType = { children?: ReactElement | ReactElement[] | undefined };

const initState: {[key: string]: ProductType[]} = {
  cat001: [{
    id: 1,
    sku: "item0001",
    name: "Widget",
    price: 9.99,
    category: "cat001"
  },
  {
    id: 3,
    sku: "item0003",
    name: "Deluxe Widget",
    price: 29.99,
    category: "cat001"
  }],
  cat002: [
  {
    id: 2,
    sku: "item0002",
    name: "Premium Widget",
    price: 19.99,
    category: "cat002"
  }],
};

const initContextState: UseProductsContextType = {
  products: {},
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
  // const [products, setProducts] = useState<{[key: string]: ProductType[]}>(initState);

  const getProduct = (id: number) => Object.values(initState).flat().find(product => product.id === id);

  const getFromTheSameCategory = (product1: ProductType) => 
    Object.values(initState).flat().filter(product => product.id !== product1.id && product.category === product1.category);



    

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
    <ProductsContext.Provider value={{ products: initState, getProduct, getFromTheSameCategory }}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsContext;
