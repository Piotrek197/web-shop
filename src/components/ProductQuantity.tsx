import styled from "styled-components";

const Input = styled.input`
  font-size: 1.25rem;
  max-width: 50px;
  max-height: 2rem;
  outline: none;
  border-color: lightgray;

  &:hover {
    border-color: lightgray;
  }

  /*
  @media screen and (max-width:1000px){
    font-size: 1rem;
    max-width: 30px;
  }

  @media screen and (max-width:650px){
    font-size: 0.75rem;
    max-width: 30px;
  }*/
`;

const Button = styled.button`
  background-color: white;
  color: #0018a8;
  font-size: 1.5rem;
  font-weight: bold;
  border: none;
  padding: 0.5rem;
  cursor: pointer;

  &:last-of-type {
    margin-right: 1rem;
  }

  @media screen and (max-width:1000px){
    font-size: 1rem;
  }

`;

type PropsType = {
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
  quantity: number;
};

const ProductQuantity = ({ quantity, setQuantity }: PropsType) => {
  return (
    <div className="qty-input" style={{display: "flex", alignItems: "center"}}>
      <Button
        onClick={() => setQuantity((prev: number) => (prev > 1 ? prev - 1 : 1))}
        className="qty-button"
      >
        -
      </Button>
      <Input 
        type="number" 
        value={quantity} 
        className="number-input"
        onChange={e => Number(e.target.value) > 0 && setQuantity(Number(e.target.value))}
        />
      <Button onClick={() => setQuantity((prev: number) => prev + 1)} className="qty-button">
        +
      </Button>
    </div>
  );
};

export default ProductQuantity;
