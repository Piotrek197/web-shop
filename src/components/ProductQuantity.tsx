type PropsType = {
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
  quantity: number;
};

const ProductQuantity = ({ quantity, setQuantity }: PropsType) => {
  return (
    <div className="qty-input">
      <button
        onClick={() => setQuantity((prev: number) => (prev > 1 ? prev - 1 : 1))}
        className="qty-button"
      >
        -
      </button>
      <input type="number" value={quantity} className="number-input" />
      <button onClick={() => setQuantity((prev: number) => prev + 1)} className="qty-button">
        +
      </button>
    </div>
  );
};

export default ProductQuantity;
