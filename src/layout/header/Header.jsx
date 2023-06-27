import { useContext } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate, Link } from "react-router-dom";

import mainlogo from "../../public/logo.png";
import { NavLink } from "react-router-dom";
import UserContext from "../../context/UserContext";
import { VscHeart, VscHeartFilled } from "react-icons/vsc";
import {
	MDBDropdown,
	MDBDropdownItem,
	MDBDropdownToggle,
	MDBDropdownMenu,
} from "mdb-react-ui-kit";
function Header() {
	const ctx = useContext(UserContext);
	const navigate = useNavigate();
	const handleLogout = () => {
		localStorage.removeItem("token");
		navigate("/auth/login");
	};

	return (
		<>
			<Navbar className="bg-body-tertiary header">
				<Container>
					<Navbar.Brand href="/">
						<div className="header d-flex">
							<div>
								<img
									src={mainlogo}
									width="60"
									height="60"
									className="d-inline-block align-top"
									alt="React Bootstrap logo"
								/>
							</div>
							<h1 className="mt-3">C</h1> <h2 className="mt-4">ocktails</h2>
						</div>
					</Navbar.Brand>

					<Navbar.Brand>
						<MDBDropdown group className="shadow-0">
							<MDBDropdownToggle color="link">
								<img
									src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img (31).webp"
									className="rounded-circle pr-2"
									height="30"
									alt="Portrait of a Woman"
									loading="lazy"
								/>
								{ctx.user.firstName} {ctx.user.lastName}
							</MDBDropdownToggle>
							<MDBDropdownMenu>
								<MDBDropdownItem tag={Link} to="/Favourites">
									Favourites
								</MDBDropdownItem>

								<MDBDropdownItem onClick={handleLogout}>
									Log Out
								</MDBDropdownItem>
							</MDBDropdownMenu>
						</MDBDropdown>
					</Navbar.Brand>
				</Container>
			</Navbar>
		</>
	);
}

export default Header;
