import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../services/Api";
import cocktailphoto from "../../public/cockphotos.png";
import UserContext from "../../context/UserContext";

import {
	MDBContainer,
	MDBCol,
	MDBRow,
	MDBBtn,
	MDBIcon,
	MDBInput,
	MDBCheckbox,
} from "mdb-react-ui-kit";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loginError, setLoginError] = useState(false);
	const ctx = useContext(UserContext);

	const navigate = useNavigate();

	const handleLogin = async (event) => {
		event.preventDefault();

		try {
			const res = await loginUser({
				email,
				password,
			});

			if (res?.accessToken) {
				localStorage.setItem("token", res.accessToken);
				localStorage.setItem("user", JSON.stringify(res.user));
				ctx.onUserUpdate({
					firstName: res.user.firstName,
					lastName: res.user.lastName,
				});

				navigate("/");
			}
			console.log(res);
		} catch (error) {
			setLoginError(true);
			console.log(error);
		}

		console.log(email, password);
	};

	return (
		<MDBContainer className="p-3 my-5 h-custom auth">
			<MDBRow>
				<MDBCol col="10" md="6">
					<img src={cocktailphoto} className="img-fluid" alt="Sample image" />
				</MDBCol>

				<MDBCol col="4" md="6">
					<div className="d-flex flex-row align-items-center justify-content-center">
						<h3>Sign In</h3>
					</div>

					<form onSubmit={handleLogin}>
						<MDBInput
							wrapperClass="mb-4"
							id="formControlLg"
							type="email"
							size="md"
							name="email"
							placeholder="Email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<MDBInput
							wrapperClass="mb-4"
							id="formControlLg"
							type="password"
							size="md"
							name="password"
							placeholder="Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>

						<div className="text-center text-md-start mt-4 pt-2">
							<MDBBtn type="submit" className="mb-0 px-5">
								Login
							</MDBBtn>
							{loginError ? (
								<div className="alert alert-danger mt-3">
									The email or password is incorrect!
								</div>
							) : (
								""
							)}
							<p className="small fw-bold mt-2 pt-1 mb-2">
								Don't have an account?{" "}
								<Link to="/auth/register" className="link-danger">
									Register
								</Link>
							</p>
						</div>
					</form>
				</MDBCol>
			</MDBRow>
		</MDBContainer>
	);
};

export default Login;
