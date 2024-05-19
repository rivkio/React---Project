import { FC, useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Spinners from '../components/Spinners';
import FavoriteButton from '../components/FavoriteButton';
import { AuthContext } from '../contexts/AuthContext';

import './MyCard.scss';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import { Card } from '../@types/cardData';
import { deleteCardById, getMyCards } from '../services/cards';
import { useSearch } from '../hooks/useSearch';
import { showConfirmDialog } from '../ui/dialogs';



const MyCards: FC = () => {
    const [cards, setCards] = useState<Card[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const authContext = useContext(AuthContext);
    const token = authContext ? authContext.token : null;
    const [favorites, setFavorites] = useState<string[]>(() => JSON.parse(localStorage.getItem('favorites') || '[]'));
    const { searchTerm } = useSearch();

    useEffect(() => {
        if (!token) {
            setLoading(false);
            return;
        }

        setLoading(true);
        getMyCards()
            .then(response => {
                setCards(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.toString());
                setLoading(false);
            });
    }, [token]);



    const deleteCard = (cardId: string) => {
        showConfirmDialog().then((result) => {
            if (result.isConfirmed) {
                deleteCardById(cardId)
                    .then(() => {
                        setCards(cards.filter(card => card._id !== cardId));
                    })
                    .catch(err => {
                        console.error("Error deleting card:", err);
                    });
            }
        });
    }

/*     const deleteCard = (cardId: string) => {
      showConfirmDialog().then((result) => {
        if (result) {
            deleteCardById(cardId)
                .then(() => {
                    setCards(cards.filter(card => card._id !== cardId));
                })
                .catch(err => {
                    console.error("Error deleting card:", err);
                });
        }
      ); */

    const addToFavorites = (cardId: string) => {
        const newFavorites = favorites.includes(cardId)
            ? favorites.filter(id => id !== cardId)
            : [...favorites, cardId];
        setFavorites(newFavorites);
        localStorage.setItem('favorites', JSON.stringify(newFavorites));
    };

    const filteredCards = cards.filter(c => c.title.toLowerCase().includes(searchTerm.toLowerCase()));


    if (!token) return <p>Please log in to view your cards.</p>;
    if (loading) return <Spinners />;
    if (error) return <div>Error loading your cards: {error}</div>;


    return (
        <div className="cards-container dark:bg-gray-700">
            {filteredCards.map((card: Card) => (
                <div key={card._id} >
                    <div className='my-card'>
                        <div className="card-link dark:bg-gray-500 dark:text-white rounded-lg shadow-lg p-4">
                            <div className="card-actions ">
                                <Link to={`/update/${card._id}`} className="card-edit-icon">
                                    <FaEdit />
                                </Link>
                                <FaTrash
                                    onClick={() => deleteCard(card._id)}
                                    className="card-delete-icon"
                                />
                                <FavoriteButton
                                    cardId={card._id}
                                    isFavorite={favorites.includes(card._id)}
                                    onToggleFavorite={addToFavorites} token={''} />
                            </div>
                            <Link to={`/cards/${card._id}`} >

                                <h2 className="card-title">{card.title}</h2>
                                <hr />
                                <p className="card-subtitle">{card.subtitle}</p>
                                <img src={card.image.url} alt={card.image.alt} className="card-image" />
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
             <Link to="/create-card" className="create-card-button"> 
             <FaPlus/>
             </Link>
        </div>
       
    );
};

export default MyCards;
