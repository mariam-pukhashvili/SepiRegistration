import { useCallback, useEffect, useState, useReducer, useRef } from "react";

//import useLocalStorage from "../../hooks/useLocalStorage";
import { getCoctails } from "../../services/Api";
import { debounce } from "../../helpers/debounce";
import Loader from "../../components/loader";
import EmptyData from "../../components/emptydata";
import CocktailsList from "../cocktails/CoctailsList";
import cocktailsReducer from "../../reducer/cocktailsReducer";
import { addToFavourites } from "../../services/Api";

const SET_COCKTAILS = "SET_COCKTAILS";
const SET_FILTER = "SET_FILTER";
const CLEAR_FILTER = "CLEAR_FILTER";
const SET_FAVOURITE = "SET_FAVOURITE";
const initialState = {
	cocktails: [],
	oldcocktails: [],
	filters: null,
	empty: false,
	favourite: false,
};

function Homepage() {
	const [state, dispatch] = useReducer(cocktailsReducer, initialState);

	const [loading, setLoading] = useState(true);
	const inputElement = useRef();

	const loadCocktails = useCallback(async () => {
		const cocktailslist = await getCoctails();

		//setcocktailsStorage(cocktailslist);
		dispatch({
			type: SET_COCKTAILS,
			payload: cocktailslist,
		});
	}, []);

	useEffect(() => {
		const timer = setTimeout(() => {
			setLoading(false);
			loadCocktails();
		}, 1000);
		return () => {
			clearTimeout(timer);
		};
	}, []);

	// useEffect(() => {
	// 	setcocktailsStorage(state.cocktails);
	// }, [state.cocktails, setcocktailsStorage]);

	const onSearch = debounce(({ target }) => {
		if (target.value.length > 3) {
			setLoading(true);
			const timer = setTimeout(() => {
				dispatch({
					type: SET_FILTER,
					payload: target.value,
				});

				setLoading(false);
			}, 1000);
			return () => {
				clearTimeout(timer);
			};
		} else {
			if (state.filter) {
				dispatch({
					type: CLEAR_FILTER,
				});
			}
		}
	});
	const handleClearEvent = () => {
		inputElement.current.value = "";
		dispatch({
			type: CLEAR_FILTER,
		});
	};

	const handleFavouriteEvent = () => {
		dispatch({
			type: SET_FAVOURITE,
		});
	};

	const handleaddToFavourites = async (cocktails) => {
		//event.preventDefault();
		const email = "sa";
		const firstName = "ma";
		const id = 1;
		try {
			const res = await addToFavourites({
				cocktails,
			});
		} catch (error) {
			console.log(error);
		}
	};

	const rendercocktails = () => {
		console.log(state.cocktails);
		return (
			<CocktailsList
				data={state.cocktails}
				favourite={state.favourite}
				handleFavourite={() => handleaddToFavourites(state.cocktails)}
			/>
		);
	};
	return (
		<div className="container m-auto w-75 mt-5">
			<div className="col-12 mb-4">
				<div className="col-12 shadow search p-5 row m-0">
					<h5> Search Your Favorite Cocktail </h5>
					<div className="col-md-11">
						<input
							type="search"
							ref={inputElement}
							className="form-control"
							placeholder="start typing..."
							name="searchTerm"
							onKeyUp={onSearch}
						/>
					</div>

					<div className="col-md-1">
						<button className="btn btn-primary" onClick={handleClearEvent}>
							clear
						</button>
					</div>
				</div>
				<h3 className="myTitle display-6">Cocktails</h3>
			</div>
			<div className="col-12">{loading ? <Loader /> : rendercocktails()}</div>

			<div className="col-12">
				{!loading && state.empty ? <EmptyData /> : ""}
			</div>
		</div>
	);
}

export default Homepage;
