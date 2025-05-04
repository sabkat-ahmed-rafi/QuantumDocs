import { logout } from "../slices/authSlice";

const logOut = async (dispatch) => {
    await dispatch(logout()).unwrap();
};

export default logOut; 