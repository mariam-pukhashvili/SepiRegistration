import { useState } from "react";
import { Link } from "react-router-dom";
import { VscHeart, VscHeartFilled } from "react-icons/vsc";
export const CocktailsList = ({ data, handleFavourite, favourite }) => {
	// const [favourite, UseFavourite] = useState(false);

	// const handleFavourite = () => {
	// 	UseFavourite(true);
	// 	console.log(favourite);
	// };

	return (
		<div className="row px-3 cocktail">
			{data.map((item) => {
				return (
					<div className="card col-4 shadow mb-3 p-0" key={item.idDrink}>
						<div className="text-end p-2">
							{favourite ? (
								<VscHeartFilled size={40} color="red" />
							) : (
								<VscHeart
									size={40}
									color="red"
									onClick={() => handleFavourite()}
								/>
							)}
						</div>
						<img
							className="card-img-top img-fluid"
							src={item.strDrinkThumb}
							alt="cocktail"
						/>
						<div className="cocktailFooter">
							<h3>{item.strDrink} </h3>
							<h6 className="mt-1">{item.strGlass}</h6>
							<p className="mt-1 text-muted">{item.strAlcoholic}</p>
							<Link to={`/details/${item.idDrink}`}>
								<button className="btn col-md-4 btn-details">Details</button>
							</Link>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default CocktailsList;
