import { Link, useNavigate } from "react-router-dom";
import "./register.scss";
import { useContext, useRef } from "react";
import { AuthContext } from "../../context/auth/AuthContext";
import { registerRequest } from "../../apiCalls/authRequests";

const Register = () => {
  const fullName = useRef();
  const email = useRef();
  const password = useRef();
  const confirmPassword = useRef();
  const { user, isLoading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password.current.value !== confirmPassword.current.value) {
      confirmPassword.current.setCustomValidity("Passwords don't match!");
    }
    const user = {
      fullName: fullName.current.value,
      email: email.current.value,
      password: password.current.value,
      confirmPassword: confirmPassword.current.value,
    };
    registerRequest(user, dispatch, navigate);
  };
  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Welcome to Social.</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
            alias totam numquam ipsa exercitationem dignissimos, error nam,
            consequatur.
          </p>
          <span>Do you have an account?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form onSubmit={handleRegister}>
            <input type="text" placeholder="fullName" ref={fullName} required />
            <input type="email" placeholder="Email" ref={email} required />
            <input
              type="password"
              placeholder="Password"
              ref={password}
              required
              minLength={6}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              ref={confirmPassword}
              required
            />
            <button type="submit">{isLoading ? "Loading" : "Register"}</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
