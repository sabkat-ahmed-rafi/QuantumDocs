import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import authSlice  from "../slices/authSlice";
import { docApiSlice } from "../slices/docApiSlice";

const persistConfig = {
    key: 'auth',
    storage,
}

const persistedAuthReducer = persistReducer(persistConfig, authSlice)

const store = configureStore({
    reducer: {
        auth: persistedAuthReducer,
        [docApiSlice.reducerPath] : docApiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: {
                ignoreActions: [
                    "persist/PERSIST",
                    "persist/REHYDRATE",
                    "persist/PAUSE",
                    "persist/PURGE",
                    "persist/REGISTER",
                    "persist/FLUSH",
                ]
            }
        }).concat(docApiSlice.middleware),
})

export const persistor = persistStore(store);
export default store;