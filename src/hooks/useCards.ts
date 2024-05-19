import { useEffect, useState } from "react";

import { getCards } from "../services/cards";
import { CardType } from "../@types/cardData";

// cards/myCards/favoriteCards

export const useCards = () => {
  const [cards, setCards] = useState<CardType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>();

  //SRP:
  useEffect(() => {
    setError(null);
    setLoading(true);
    getCards()
      .then((res) => {
        setCards(res.data);
        setError(null);
      })
      .catch((e) => {
        setError("Network error");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { cards, loading, error, setCards };
};
