import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FavoriteButton from "../components/FavoriteButton";
import { useAuth } from "../contexts/AuthContext";
import "./Cards.scss";

import { CardType } from "../@types/cardData";
import { useSearch } from "../hooks/useSearch";
import { getCards } from "../services/cards";



const Cards = ({ favoritesOnly = false }) => {
  const [cards, setCards] = useState<CardType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const { token, isLoggedIn } = useAuth();
  const { searchTerm } = useSearch();

  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const currentFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(currentFavorites);

    setLoading(true);
    getCards()
      .then((res) => {
        setCards(res.data);
      })
      .catch(() => setError("Error fetching cards"))
      .finally(() => setLoading(false));
  }, []);

  const addToFavorites = (cardId: string) => {
    const newFavorites = favorites.includes(cardId)
      ? favorites.filter(id => id !== cardId)
      : [...favorites, cardId];
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };
  const filteredCards = cards.filter(card => { // Filter cards based on search term and favorites
    const matchesSearchTerm = card.title.toLowerCase().includes(searchTerm.toLowerCase());
    return favoritesOnly
      ? matchesSearchTerm && favorites.includes(card._id)
      : matchesSearchTerm;
  })

  return (
    <>
      <div className="flex flex-col bg-stone-200">

        <div className="dark:bg-gray-400 bg-stone-200 flex flex-wrap justify-center items-center p-0 h-auto">

          {filteredCards.map((card: CardType) => (
            <div key={card._id} className="flex flex-col justify-center items-center p-5 text-center bg-stone-200 m-2 dark:bg-gray-400 relative">
              <Link to={`/cards/${card._id}`} className="card-link dark:bg-gray-500 dark:text-white rounded-lg shadow-lg p-4 bg-pink-200">
                {isLoggedIn && (
                  <FavoriteButton
                    cardId={card._id}
                    isFavorite={favorites.includes(card._id)}
                    onToggleFavorite={addToFavorites} token={""}
                  />
                )}

                <img 
                src={card.image.url} 
                alt={card.image.alt} 
                  className="w-72 h-48 object-cover mt-3 rounded-md drop-shadow-md" 
                />

                <div className="m-1 ">
                  <h2 className="text-l px-1 py-0.5 font-bold">{card.title}</h2>
                  <p className="paragraph mb-6 text-sm">{card.subtitle}</p>
                </div>

              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Cards;
