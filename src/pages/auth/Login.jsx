import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../services/Api";

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
				navigate("/");
			}
			console.log(res);
		} catch (error) {
			console.log(error);
		}

		console.log(email, password);
	};

	return (
		<MDBContainer fluid className="p-3 my-5 h-custom">
			<MDBRow>
				<MDBCol col="10" md="6">
					<img
						src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
						class="img-fluid"
						alt="Sample image"
					/>
				</MDBCol>

				<MDBCol col="4" md="6">
					<div className="d-flex flex-row align-items-center justify-content-center">
						<h3 className="lead fw-normal mb-4 me-3 ">Sign in</h3>
					</div>

					<form onSubmit={handleLogin}>
						<MDBInput
							wrapperClass="mb-4"
							id="formControlLg"
							type="email"
							size="lg"
							name="email"
							placeholder="Email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<MDBInput
							wrapperClass="mb-4"
							id="formControlLg"
							type="password"
							size="lg"
							name="password"
							placeholder="Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>

						<div className="d-flex justify-content-between mb-4">
							<MDBCheckbox
								name="flexCheck"
								value=""
								id="flexCheckDefault"
								label="Remember me"
							/>
							<a href="!#">Forgot password?</a>
						</div>

						<div className="text-center text-md-start mt-4 pt-2">
							<MDBBtn className="mb-0 px-5" size="lg">
								Login
							</MDBBtn>
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
