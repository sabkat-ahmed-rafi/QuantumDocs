import { onAuthStateChanged } from "firebase/auth";
import { setLoading, setUser } from "../slices/authSlice"
import auth from "../firebase/firebase.init";
import axios from "axios";

const setTokenInCookies = async (user) => {
    try{
        const result = await axios.post(`${process.env.NEXT_PUBLIC_user_service}/api/setJwt`, user, {withCredentials: true})
        const token = result.data.token;
        if(token) {
            localStorage.setItem("token", token);
        } else {
            console.log("Something went wrong while setting the token")
        }
    } catch(error) {
        console.log("Something wrong when setting the token in the cookies")
    }
};


export const subscribeToAuthState = (dispatch) => {
    dispatch(setLoading(true));

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
        if(currentUser) {
            const {uid, email, displayName, photoURL} = currentUser;
            setTokenInCookies({ uid, email, displayName, photoURL });
            dispatch(setUser({uid, email, displayName, photoURL}));
        } else {
            dispatch(setUser(null));
        }

        dispatch(setLoading(false));

        return unsubscribe;
    })
}