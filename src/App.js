import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import UserContext from "./context/UserContext";

function App() {
	const [user, setUser] = useState({ user: { firstName: "", lastName: "" } });

	useEffect(() => {
		let storedUser = localStorage.getItem("user");
		if (storedUser) {
			const parsedUser = JSON.parse(storedUser);
			handleUserUpdate({
				firstName: parsedUser.firstName,
				lastName: parsedUser.lastName,
			});
		}
	}, []);
	const handleUserUpdate = (user) => {
		setUser(user);
	};
	return (
		<UserContext.Provider value={{ user, onUserUpdate: handleUserUpdate }}>
			<div className="App">
				<Outlet />
			</div>
		</UserContext.Provider>
	);
}

export default App;
