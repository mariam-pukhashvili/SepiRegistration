import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

import mainlogo from "../../public/logo.png";

function Header() {
	return (
		<>
			<Navbar className="bg-body-tertiary">
				<Container>
					<Navbar.Brand href="#home">
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
				</Container>
			</Navbar>
		</>
	);
}

export default Header;
