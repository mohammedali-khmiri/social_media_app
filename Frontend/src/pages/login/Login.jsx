import { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../apiCalls/authRequests";
import { AuthContext } from "../../context/auth/AuthContext";
import "./login.scss";

const Login = () => {
  const email = useRef();
  const password = useRef();
  const { user, isLoading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    login(
      { email: email.current.value, password: password.current.value },
      dispatch,
      navigate
    );
  };
  console.log(user);
  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Hello Word.</h1>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quae,
            placeat illo. Nisi reprehenderit numquam distinctio adipisci tempora
            alias porro sequi?
          </p>
          <span>Don't you have an account?</span>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form action="">
            <input type="email" placeholder="Email" name="email" ref={email} />
            <input
              type="password"
              placeholder="Password"
              name="password"
              ref={password}
            />
            <button onClick={handleLogin} disabled={isLoading}>
              {isLoading ? "Loading" : "Login"}
            </button>
            <span style={{ color: "red", fontSize: "36px" }}>
             
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
