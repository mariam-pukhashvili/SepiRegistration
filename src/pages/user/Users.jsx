import { useEffect, useState } from "react";
import { getUsers } from "../../services/Api";
import { getCoctails } from "../../services/Api";
import { Link } from "react-router-dom";
const Users = () => {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		fetchUsers();
	}, []);

	const fetchUsers = async () => {
		const appUsers = await getCoctails();
		if (appUsers?.length) {
			setUsers(appUsers);
		}
		console.log(appUsers);
		return appUsers;
	};

	return (
		<div className="row px-3 cocktail">
			{users &&
				users.map((item) => {
					return (
						<div className="card col-4 shadow mb-3 p-0" key={item.idDrink}>
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

export default Users;
