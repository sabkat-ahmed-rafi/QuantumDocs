import { onAuthStateChanged } from "firebase/auth";
import { setLoading, setUser } from "../slices/authSlice"
import auth from "../firebase/firebase.init";




export const subscribeToAuthState = (dispatch, getToken) => {
    dispatch(setLoading(true));

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
        if(currentUser) {
            const {name, email, displayName, photoURL} = currentUser;
            dispatch(setUser({name, email, displayName, photoURL}));
        } else {
            dispatch(setUser(null));
        }

        dispatch(setLoading(false));

        return unsubscribe;
    })
}