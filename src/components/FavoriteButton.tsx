import { FaHeart, FaRegHeart } from "react-icons/fa";
import { FC } from 'react';
import { FavoriteButtonProps } from '../@types/cardData';
import { isFavoriteUrl } from '../services/cards';
import dialogs from "../ui/dialogs";



const FavoriteButton: FC<FavoriteButtonProps> = ({ cardId, isFavorite, onToggleFavorite, token }) => {
    const toggleFavorite = () => {

        // Make a PATCH request to toggle favorite status on the server
        isFavoriteUrl(cardId)
            .then(() => {
                onToggleFavorite(cardId); // Update local state after successful server call
            })
            .catch(err => {
                console.error('Error toggling favorite:', err);
            });
    };

    return (
        <button
            style={{ color: "rgb(191, 121, 150)", fontSize: "rem" }}
            className="add-to-favorite-button"
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleFavorite();
            }}
        >
            {isFavorite ? <FaHeart /> : <FaRegHeart />}
        </button>
    );
};

export default FavoriteButton;
