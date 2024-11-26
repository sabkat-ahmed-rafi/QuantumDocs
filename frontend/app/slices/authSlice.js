import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import auth from "../firebase/firebase.init";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth/web-extension";


// create a user 
export const createUser = createAsyncThunk('auth/createUser', 
    async ({email, password}) => {
        const {user} = await createUserWithEmailAndPassword(auth, email, password);
        return {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
        }
    }
)

// update a user 
export const updateUser = createAsyncThunk('auth/updateUser', 
    async ({name}) => {
        await updateProfile(auth.currentUser, {displayName: name});
        return {
            uid: auth.currentUser.uid,
            email: auth.currentUser.email,
            displayName: auth.currentUser.displayName,
            photoURL: auth.currentUser.photoURL,
        }
    }
)


// Login a user 
export const loginUser = createAsyncThunk('auth/loginUser', 
    async (email, password) => {
        const {user} = await signInWithEmailAndPassword(auth, email, password);
        return {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
        }
    }
)


// Login a user with Google 
const googleProvider = new GoogleAuthProvider();

export const googleLogin = createAsyncThunk('auth/googleLogin',
    async () => {
        const {user} = await signInWithPopup(auth, googleProvider);
        return {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
        }
    }
)


// Logout user 
export const logout = createAsyncThunk('auth/logout',
    async () => {
        await signOut(auth);
    }
)


const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        loading: false
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(createUser.pending, (state) => {state.loading = true})
        .addCase(createUser.fulfilled, (state, action) => {state.user = action.payload, state.loading = false})
        .addCase(createUser.rejected, (state, action) => {state.error = action.error.message, state.loading = false})

        .addCase(updateUser.pending, (state) => {state.loading = true})
        .addCase(updateUser.fulfilled, (state, action) => {state.user = action.payload, state.loading = false})
        .addCase(updateUser.rejected, (state, action) => {state.error = action.error.message, state.loading = false})

        .addCase(loginUser.pending, (state) => { state.loading = true; })
        .addCase(loginUser.fulfilled, (state, action) => { state.user = action.payload; state.loading = false; })
        .addCase(loginUser.rejected, (state, action) => { state.error = action.error.message; state.loading = false; })
  
        .addCase(googleLogin.pending, (state) => { state.loading = true; })
        .addCase(googleLogin.fulfilled, (state, action) => { state.user = action.payload; state.loading = false; })
        .addCase(googleLogin.rejected, (state, action) => { state.error = action.error.message; state.loading = false; })

        .addCase(logout.pending, (state) => { state.loading = true; })
        .addCase(logout.fulfilled, (state) => { state.user = null; state.loading = false; })
        .addCase(logout.rejected, (state, action) => { state.error = action.error.message; state.loading = false; })
    }
})

export const {setUser, setLoading} = authSlice.actions;
export default authSlice.reducer;