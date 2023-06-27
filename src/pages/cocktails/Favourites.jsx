import { useEffect, useState } from "react";
import { getUsers } from "../../services/Api";
import { getFavourites, deleteFromFavourites } from "../../services/Api";
import { Link } from "react-router-dom";

const Favourites = () => {
	const [cocktails, setCocktails] = useState([]);

	useEffect(() => {
		fetchCocktails();
	}, []);

	const fetchCocktails = async () => {
		const appCocktails = await getFavourites();
		if (appCocktails?.length) {
			setCocktails(appCocktails);
		}
		console.log(appCocktails);
		return appCocktails;
	};
	const handleDeleteDrink = async (drinkid) => {
		console.log(drinkid);
		const res = await deleteFromFavourites(drinkid);
		setCocktails(cocktails.filter((drink) => drinkid !== drink.id));
		//return res;
	};

	return (
		<div className="row px-3 cocktail">
			{cocktails &&
				cocktails.map((item) => {
					return (
						<div
							className="container favouriteclass m-auto w-75 mt-5"
							key={item.id}
						>
							<div className="card">
								<img
									className="card-img-top img-fluid"
									src={item.strDrinkThumb}
									alt="cocktail"
								/>
								<div className="card-body text-start  ">
									<h3>{item.strDrink} </h3>
									<h6 className="mt-1">{item.strGlass}</h6>
									<p className="mt-1 text-muted">{item.strAlcoholic}</p>
									<p className="mt-1 text-muted">{item.strCategory}</p>
									<p className="mt-1 text-muted">{item.strIngredient1}</p>

									<div
										class="forhref"
										onClick={() => handleDeleteDrink(item.id)}
									>
										Delete
									</div>
								</div>
							</div>
						</div>
					);
				})}
		</div>
	);
};

export default Favourites;
