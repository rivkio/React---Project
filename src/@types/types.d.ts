import { ReactNode } from 'react';
export type LoginUser = {
  email: string;
  password: string;
};
// type for the object
export type RegisterUser = {
  name: {
    first: string;
    middle?: string;
    last: string;
  };
  phone: string;
  email: string;
  password: string;
  image?: {
    url: string;
    alt?: string;
  };
  address: {
    state?: string;
    country: string;
    city: string;
    street: string;
    houseNumber: number;
    zip: number;
  };
  isBusiness: boolean;
};



export type ErrorType = {
  status: number;
  message: string;
  details: string;
};


// טיפוס לפונקציה שמקבלת ילדים ומחזירה אלמנט של ראקט
export type FCC = ({ children: ReactNode }) => ReactNode;

export type SearchContextType  = {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}
