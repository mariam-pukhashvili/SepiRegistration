import { useCallback, useEffect, useState, useReducer, useRef } from "react";

//import useLocalStorage from "../../hooks/useLocalStorage";
import { getCoctails } from "../../services/Api";
import { debounce } from "../../helpers/debounce";
import Loader from "../../components/loader";
import EmptyData from "../../components/emptydata";
import CocktailsList from "../cocktails/CoctailsList";
import cocktailsReducer from "../../reducer/cocktailsReducer";
import { addToFavourites } from "../../services/Api";
import { updateDrinks } from "../../services/Api";
import { deleteFromFavourites, getFilteredData } from "../../services/Api";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useParams } from "react-router-dom";
const SET_COCKTAILS = "SET_COCKTAILS";
const SET_FILTER = "SET_FILTER";
const CLEAR_FILTER = "CLEAR_FILTER";
const SET_FAVOURITE = "SET_FAVOURITE";
const REMOVE_FAVOURITE = "REMOVE_FAVOURITE";
const initialState = {
	cocktails: [],
	oldcocktails: [],
	filters: null,
	empty: false,
	favourite: false,
};

function Homepage() {
	let { q } = useParams();

	const queryParams = new URLSearchParams(window.location.search);
	let searchkey = queryParams.get("q");

	const [state, dispatch] = useReducer(cocktailsReducer, initialState);
	const navigate = useNavigate();
	const [loading, setLoading] = useState(true);
	const [searching, setsearching] = useState(false);
	const inputElement = useRef();

	const loadCocktails = useCallback(async () => {
		const cocktailslist = searchkey
			? await getFilteredData(searchkey)
			: await getCoctails();

		if (searchkey) inputElement.current.value = searchkey;
		//console.log(cocktailslist);
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
	const handleClearEvent = async () => {
		inputElement.current.value = "";
		const cocktailslist = await getCoctails();
		setLoading(true);
		const timer = setTimeout(() => {
			dispatch({
				type: SET_COCKTAILS,
				payload: cocktailslist,
			});
			setLoading(false);
			navigate("/");
		}, 1000);
		return () => {
			clearTimeout(timer);
		};
	};

	const handleFavouriteEvent = async (drinkid) => {
		dispatch({
			type: SET_FAVOURITE,
			payload: drinkid,
		});
	};

	const handleremoveFavourite = async (drinkid) => {
		const res = await deleteFromFavourites(drinkid.id);
		dispatch({
			type: REMOVE_FAVOURITE,
			payload: drinkid,
		});
	};

	const handleFilterEvent = async () => {
		let searchdata = inputElement.current.value;
		if (searchdata != "") {
			const res = await getFilteredData(searchdata);

			setLoading(true);
			const timer = setTimeout(() => {
				dispatch({
					type: SET_COCKTAILS,
					payload: res,
				});
				setLoading(false);
				navigate("/?q=" + searchdata);
			}, 1000);
			return () => {
				clearTimeout(timer);
			};
		}
	};

	const handleaddToFavourites = async (drinkid) => {
		//event.preventDefault();

		// const favouriteCocktail = state.cocktails.filter((cocktail) => {
		// 	if (cocktail.id === drinkid.id) {
		// 		return cocktail;
		// 	} else return false;
		// });

		const favouriteCocktail = state.cocktails.filter(
			(item) => item.id === drinkid.id
		);
		try {
			if (favouriteCocktail) {
				await handleFavouriteEvent(drinkid);
				const res = await addToFavourites(favouriteCocktail[0]);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const rendercocktails = () => {
		return (
			<>
				<CocktailsList
					data={state.cocktails}
					handleFavourite={(id) => handleaddToFavourites({ id })}
					removeFavourite={(id) => handleremoveFavourite({ id })}
				/>
			</>
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

							// onKeyUp={onSearch}
						/>
					</div>
					<div className="col-1">
						{!searchkey ? (
							<button className="btn btn-primary" onClick={handleFilterEvent}>
								Search
							</button>
						) : (
							<button className="btn btn-primary" onClick={handleClearEvent}>
								Clear
							</button>
						)}
					</div>
				</div>
			</div>
			<div className="col-12">{loading ? <Loader /> : rendercocktails()}</div>

			<div className="col-12">
				{!loading && state.empty ? <EmptyData /> : ""}
			</div>
		</div>
	);
}

export default Homepage;
