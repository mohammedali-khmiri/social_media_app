import axios from "axios";

export const login = async (userCredential, dispatch, navigate) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axios.post("auth/login", userCredential);
    // if is it successful
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    navigate("/");
  } catch (error) {
    dispatch({ type: "LOGIN_FAILURE", payload: error });
  }
};

export const Register = async (userCredential, dispatch, navigate) => {
  dispatch({ type: "R_START" });
  try {
    const res = await axios.post("auth/login", userCredential);
    // if is it successful
    dispatch({ type: "Register_SUCCESS", payload: res.data });
    navigate("/");
  } catch (error) {
    dispatch({ type: "LOGIN_FAILURE", payload: error });
  }
};
