export type MyProductsProps = {
  listId: string;
  data: ProductProps[];
};

export type ProductProps = {
  id: string;
  name: string;
  price: string;
  amount: string;
  total: string;
  checked: boolean;
};
