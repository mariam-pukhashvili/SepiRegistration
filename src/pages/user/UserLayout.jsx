import { Outlet } from "react-router-dom";
import Header from "../../layout/header/Header";

const UserLayout = () => {
	return (
		<>
			<Header />
			<Outlet />
		</>
	);
};

export default UserLayout;
