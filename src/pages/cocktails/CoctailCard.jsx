import { useState } from "react";
import { Link } from "react-router-dom";
import { VscHeart, VscHeartFilled } from "react-icons/vsc";

const CocktailCard = ({
	item,
	handleFavourite,
	favourites,
	removeFavourite,
}) => {
	//const [checkfavourite, setFavourite] = useState(false);
	const forfavourite = favourites.filter((fav) => fav.id === item.id);
	//
	return (
		<div className="card col-md-4 shadow mb-3 p-0" key={item.id}>
			<div className="text-end p-2">
				{forfavourite.length > 0 || item.forfavourite ? (
					<VscHeartFilled
						size={40}
						color="#e83e8c"
						onClick={() => removeFavourite(item.id)}
					/>
				) : (
					<VscHeart
						size={40}
						color="#e83e8c"
						onClick={() => handleFavourite(item.id)}
					/>
				)}
			</div>
			<img
				className="card-img-top img-fluid"
				src={item.strDrinkThumb}
				alt="cocktail"
			/>
			<div className="cocktailFooter mb-3">
				<h3>{item.strDrink} </h3>
				<h6 className="mt-1">{item.strGlass}</h6>
				<p className="mt-1 text-muted">{item.strAlcoholic}</p>
				<div className="mt-1 text-start category  pl-5">
					<i>{item.strCategory}</i>
				</div>
				<Link to={`/details/${item.id}`}>
					<div className="btn-details text-end mr-3">Details</div>
				</Link>
			</div>
		</div>
	);
};
export default CocktailCard;
