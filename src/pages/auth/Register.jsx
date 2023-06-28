import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { registerUser } from "../../services/Api";
import {
	MDBContainer,
	MDBCol,
	MDBRow,
	MDBBtn,
	MDBIcon,
	MDBInput,
	MDBCheckbox,
} from "mdb-react-ui-kit";
import cocktailphoto from "../../public/cockphotos.png";
const Register = () => {
	const [email, setEmail] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [username, setUsername] = useState("");
	const [phone, setPhone] = useState("");
	const [password, setPassword] = useState("");
	const [repassword, setRePassword] = useState("");
	const [registerError, setregisterError] = useState("");

	const navigate = useNavigate();

	const [formErrors, setFormErrors] = useState({});

	const handleRegister = async (event) => {
		event.preventDefault();

		let errorMessage = formsError();
		if (errorMessage != "") {
			setregisterError(errorMessage);
			return false;
		}
		try {
			const res = await registerUser({
				email,
				firstName,
				lastName,
				username,
				phone,
				password,
				repassword,
			});

			if (res?.accessToken) {
				navigate("/auth/login");
			}
		} catch (error) {
			//console.log(error);
			setregisterError(error.message);
		}
	};

	const formsError = () => {
		let message = "";

		if (isNaN(phone)) {
			message = "Phone must be a number";
		} else if (username.length < 3 || username.length > 12) {
			message = "username must be at least 3 to 12 characters in length";
		} else if (password.length < 6 || username.length > 20) {
			message = "password must be at least 6 to 20 characters in length";
		} else if (password !== repassword) {
			message = "These passwords don't match!";
		} else if (password.search(/[A-Z]/) < 0) {
			message = "Your password needs an upper case letter!";
		} else if (password.search(/[0-9]/) < 0) {
			message = "Your password needs a number";
		}

		return message;
	};

	return (
		<MDBContainer className="p-3 my-5 h-custom auth">
			<MDBRow>
				<MDBCol col="10" md="6">
					<img src={cocktailphoto} class="img-fluid" alt="Sample image" />
				</MDBCol>

				<MDBCol col="4" md="6">
					<h3>Registration</h3>
					<form onSubmit={handleRegister}>
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
							name="firstName"
							size="md"
							placeholder="First Name"
							value={firstName}
							onChange={(e) => setFirstName(e.target.value)}
						/>

						<MDBInput
							wrapperClass="mb-4"
							id="formControlLg"
							type="text"
							size="md"
							name="lastName"
							placeholder="Last Name"
							value={lastName}
							onChange={(e) => setLastName(e.target.value)}
						/>

						<MDBInput
							wrapperClass="mb-4"
							id="formControlLg"
							type="text"
							size="md"
							name="username"
							placeholder="Username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
						<MDBInput
							wrapperClass="mb-4"
							id="formControlLg"
							type="text"
							name="phone"
							size="md"
							placeholder="Phone"
							value={phone}
							onChange={(e) => setPhone(e.target.value)}
						/>

						<MDBInput
							wrapperClass="mb-4"
							id="formControlLg"
							type="password"
							name="password"
							size="md"
							placeholder="Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<MDBInput
							wrapperClass="mb-4"
							id="formControlLg"
							type="password"
							name="repassword"
							size="md"
							placeholder="Repeat Password"
							value={repassword}
							onChange={(e) => setRePassword(e.target.value)}
						/>
						<MDBBtn type="submit" className="mb-0 px-5" size="md">
							Register
						</MDBBtn>
						{registerError ? (
							<div className="alert alert-danger mt-3">{registerError}</div>
						) : (
							""
						)}
						<p className="small fw-bold mt-2 pt-1 mb-2">
							Already have an account?{" "}
							<Link to="/auth/login" className="link-danger">
								Login
							</Link>
						</p>
					</form>
				</MDBCol>
			</MDBRow>
		</MDBContainer>
	);
};

export default Register;
