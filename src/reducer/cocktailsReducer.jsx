const cocktailsReducer = (state, action) => {
	const SET_COCKTAILS = "SET_COCKTAILS";
	const SET_FILTER = "SET_FILTER";
	const CLEAR_FILTER = "CLEAR_FILTER";
	const SET_FAVOURITE = "SET_FAVOURITE";

	switch (action.type) {
		case SET_COCKTAILS:
			return {
				...state,
				cocktails: action.payload,
				oldcocktails: [...action.payload],
			};
		case SET_FILTER:
			// eslint-disable-next-line
			const data = state.cocktails.filter((item) =>
				item.strGlass.toLowerCase().includes(action.payload.toLowerCase())
			);
			if (data.length === 0) {
				state.empty = true;
			}
			return {
				...state,
				filter: action.payload,
				cocktails: data,
			};
		case CLEAR_FILTER:
			return {
				...state,
				filter: null,
				cocktails: [...state.oldcocktails],
				empty: false,
			};
		case SET_FAVOURITE:
			// return {
			// 	...state,
			// 	favourite: true,
			// 	cocktails: [...state.oldcocktails],
			// 	empty: false,
			// };

			const favdata = state.cocktails.map((item) => {
				if (item.id === action.payload) {
					item.favourite = !item.favourite;
				}
			});

			return {
				...state,
				filter: action.payload,
				cocktails: favdata,
			};

		default:
			throw new Error("");
	}
};

export default cocktailsReducer;
