import { useState } from "react";
import { Link } from "react-router-dom";
import { VscHeart, VscHeartFilled } from "react-icons/vsc";
import { getFavourites, deleteFromFavourites } from "../../services/Api";
import CocktailCard from "./CoctailCard";
export const CocktailsList = ({ data, handleFavourite, favourite }) => {
	//const [favourite, UseFavourite] = useState(false);

	// const handleFavourite = () => {
	// 	UseFavourite(true);
	// 	console.log(favourite);
	// };
	// const [cocktails, setCocktails] = useState([]);

	// useEffect(() => {
	// 	fetchCocktails();
	// }, []);

	// const fetchCocktails = async () => {
	// 	const appCocktails = await getFavourites();
	// 	if (appCocktails?.length) {
	// 		setCocktails(appCocktails);
	// 	}
	// 	console.log(appCocktails);
	// 	return appCocktails;
	// };
	return (
		<div className="row px-3 cocktail">
			{data.map((item) => {
				return (
					<CocktailCard
						key={item.id}
						item={item}
						handleFavourite={() => handleFavourite()}
						favourite={item.favourite}
					/>
				);
			})}
		</div>
	);
};

export default CocktailsList;
