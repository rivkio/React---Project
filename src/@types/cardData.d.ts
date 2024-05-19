// File: @types/types.ts

export interface CardData {
    _id: string;
    title: string; // required, min length 2, max length 256
    subtitle: string; // required, min length 2, max length 256
    description: string; // required, min length 2, max length 1024
    phone: string; // required, min length 9, max length 11
    email: string; // required, min length 5
    web: string; // optional, min length 14
    image: { // required
        url: string; // min length 14
        alt: string; // min length 2, max length 256
    };
    address: { // required
        state: string; // optional
        country: string; // required
        city: string; // required
        street: string; // required
        houseNumber: number; // required
        zip: number; // optional
    };
}
interface Card {
    _id: string;
    title: string;
    subtitle: string;
    image: {
        url: string;
        alt: string;
    };
}
type FavoriteButtonProps = {
    cardId: string;
    isFavorite: boolean;
    onToggleFavorite: (cardId: string) => void; // Adjust this as per the new API call
    token: string; // Pass the authentication token
};

export type CardType = {
    _id: string;
    title: string;
    subtitle: string;
    description: string;
    phone: string;
    email: string;
    web: string;
    image: {
      url: string;
      alt: string;
      _id: string;
    };
    address: {
      state: string;
      country: string;
      city: string;
      street: string;
      houseNumber: number;
      zip: number;
      _id: string;
    };
    bizNumber: number;
    likes: string[];
    user_id: string;
    createdAt: string;
    __v: number;
  };

  export type updateCard = {
    title: string;
    subtitle: string;
    description: string;
    phone: string;
    email: string;
    web: string;
    image: {
      url: string;
      alt: string;
    };
    address: {
      state: string;
      country: string;
      city: string;
      street: string;
      houseNumber: number;
      zip: number;
    };
  
  }