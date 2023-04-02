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

export const registerRequest = async (userCredential, dispatch, navigate) => {
  dispatch({ type: "REGISTER_START" });
  try {
    const res = await axios.post("auth/register", userCredential);
    // if is it successful
    dispatch({ type: "REGISTER_SUCCESS", payload: res.data });
    navigate("/login");
  } catch (error) {
    dispatch({ type: "REGISTER_FAILURE", payload: error });
  }
};
