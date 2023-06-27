import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOneCoctails } from "../../services/Api";

const CocktailDetail = () => {
	let { id } = useParams();
	const [cocktail, setCocktail] = useState([]);
	useEffect(() => {
		getOneDrink(id);
	}, []);

	const getOneDrink = async (id) => {
		console.log({ id });
		const result = await getOneCoctails(id);
		setCocktail(result);
		console.log(result);
		return result;
	};

	return (
		<div className="row px-3 cocktail details">
			<div className="container  m-auto w-75 mt-5" key={cocktail.id}>
				<div className="card">
					<img
						className="card-img-top img-fluid"
						src={cocktail.strDrinkThumb}
						alt="cocktail"
					/>
					<div className="card-body text-start  ">
						<h3>{cocktail.strDrink} </h3>
						<h5 className="mt-1">{cocktail.strGlass}</h5>
						<p className="mt-1 text-muted">{cocktail.strAlcoholic}</p>
						<p className="mt-1 text-muted">{cocktail.strCategory}</p>
						<div className="mt-1 mb-3">
							<u>{cocktail.strIngredient1}</u>
						</div>
						<div className="description">{cocktail.strInstructions}</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CocktailDetail;
