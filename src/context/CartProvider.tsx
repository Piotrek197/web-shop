import { createContext, useMemo, useReducer, ReactElement } from "react";

export type CartItemType = {
  sku: string;
  name: string;
  price: number;
  qty: number;
};

type CartStateType = { cart: CartItemType[], visible: boolean};

const initCartState: CartStateType = { cart: [], visible: false};

const REDUCER_ACTION_TYPE = {
  ADD: "ADD",
  REMOVE: "REMOVE",
  QUANTITY: "QUANTITY",
  SUBMIT: "SUBMIT",
  REMOVE_VISIBLE: "REMOVE_VISIBLE"
};

export type ReducerActionType = typeof REDUCER_ACTION_TYPE;

export type ReducerAction = {
  type: string;
  payload?: CartItemType;
  setVisible?: boolean
};

const reducer = (state: CartStateType, action: ReducerAction): CartStateType => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.ADD: {
      if (!action.payload) {
        throw new Error("action payload missing in ADD action");
      }
      const { sku, name, price, qty } = action.payload;
      console.log(sku, name, price, qty);
      const filteredCart: CartItemType[] = state.cart.filter(item => item.sku !== sku);
      const itemExists: CartItemType | undefined = state.cart.find(item => item.sku === sku);
      const finalQty: number = itemExists ? itemExists.qty + qty : qty;
      return { ...state, cart: [...filteredCart, { sku, name, price, qty: finalQty }], visible: action.setVisible ?? false};
    }
    case REDUCER_ACTION_TYPE.REMOVE: {
      if (!action.payload) {
        throw new Error("action payload missing in REMOVE action");
      }
      const { sku, name, price } = action.payload;
      const filteredCart: CartItemType[] = state.cart.filter(item => item.sku !== sku);
      return { ...state, cart: [...filteredCart] };
    }
    case REDUCER_ACTION_TYPE.QUANTITY: {
      if (!action.payload) {
        throw new Error("action payload missing in QUANTITY action");
      }
      const { sku, qty } = action.payload;
      const itemExists: CartItemType | undefined = state.cart.find(item => item.sku === sku);
      if (!itemExists) {
        throw new Error("Item must exist in order to update quantity");
      }

      const updatedItem: CartItemType = { ...itemExists, qty };
      const filteredCart: CartItemType[] = state.cart.filter(item => item.sku !== sku);
      return { ...state, cart: [...filteredCart, updatedItem] };
    }
    case REDUCER_ACTION_TYPE.SUBMIT: {
      return { ...state, cart: [] };
    }
    case REDUCER_ACTION_TYPE.REMOVE_VISIBLE: {
      return { ...state, visible: false}
    }

    default:
      throw new Error("Undefined reducer action type");
  }
};

const useCartContext = (initCartState: CartStateType) => {
  const [state, dispatch] = useReducer(reducer, initCartState);

  const REDUCER_ACTIONS = useMemo(() => {
    return REDUCER_ACTION_TYPE;
  }, []);

  const totalItems = state.cart.reduce((previousValue, cartItem) => {
    return previousValue + cartItem.qty;
  }, 0);

  const totalPrice = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
    state.cart.reduce((prevoiusValue, cartItem) => {
      return prevoiusValue + cartItem.qty * cartItem.price;
    }, 0)
  );

  return { dispatch, REDUCER_ACTIONS, totalItems, totalPrice, cart: state.cart, visible: state.visible};
};

export type UseCartContextType = ReturnType<typeof useCartContext>;

const initCartContextState: UseCartContextType = {
  dispatch: () => {},
  REDUCER_ACTIONS: REDUCER_ACTION_TYPE,
  totalItems: 0,
  totalPrice: "",
  cart: [],
  visible: false
};

export const CartContext = createContext<UseCartContextType>(initCartContextState);

type ChildrenType = {
  children?: ReactElement | ReactElement[];
};

export const CartProvider = ({ children }: ChildrenType): ReactElement => {
  return (
    <CartContext.Provider value={useCartContext(initCartState)}>{children}</CartContext.Provider>
  );
};

export default CartContext;
