import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { VscHeart, VscHeartFilled } from "react-icons/vsc";
import { getFavourites, deleteFromFavourites } from "../../services/Api";
import CocktailCard from "./CoctailCard";
export const CocktailsList = ({ data, handleFavourite, removeFavourite }) => {
	//const [favourite, UseFavourite] = useState(false);

	// const handleFavourite = () => {
	// 	UseFavourite(true);
	// 	console.log(favourite);
	// };
	const [Favourites, setFavourites] = useState([]);

	useEffect(() => {
		fetchFavourites();
	}, []);

	const fetchFavourites = async () => {
		const appFavourites = await getFavourites();
		if (appFavourites?.length) {
			setFavourites(appFavourites);
		}

		return appFavourites;
	};
	return (
		<div className="row px-3 cocktail">
			{data.map((item) => {
				return (
					<CocktailCard
						key={item.id}
						item={item}
						handleFavourite={() => handleFavourite(item.id)}
						removeFavourite={() => removeFavourite(item.id)}
						favourites={Favourites}
					/>
				);
			})}
		</div>
	);
};

export default CocktailsList;
