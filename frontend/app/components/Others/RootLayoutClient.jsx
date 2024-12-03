'use client';
import store from "@/app/store/store";
import { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { subscribeToAuthState } from "../../utils/subscribeToAuthState";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "@/app/store/store";

function AppContent({ children }) {
    const dispatch = useDispatch();

    const getToken = async (email) => {
        console.log(`Fetching token for ${email}`);
    };

    useEffect(() => {
        const unsubscribe = subscribeToAuthState(dispatch, getToken);

        return () => {
            if (typeof unsubscribe === "function") {
              unsubscribe();
            }
          };
    }, [dispatch]);

    return <>{children}</>;
}

export default function RootLayoutClient({ children }) {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
            <AppContent>{children}</AppContent>
            </PersistGate>
        </Provider>
    );
}
