export interface Customer {
  id: number;
  name: string;
  email: string;
  address: {
    suite: string;
    street: string;
    city: string;
    zipcode: string;
  };
  company: {
    name: string;
    catchPhrase: string;
  };
}
