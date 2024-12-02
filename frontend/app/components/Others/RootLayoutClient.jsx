'use client';
import store from "@/app/store/store";
import { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { subscribeToAuthState } from "../../utils/subscribeToAuthState";

function AppContent({ children }) {
    const dispatch = useDispatch();

    const getToken = async (email) => {
        console.log(`Fetching token for ${email}`);
    };

    useEffect(() => {
        const unsubscribe = subscribeToAuthState(dispatch, getToken);

        return () => unsubscribe();
    }, [dispatch]);

    return <>{children}</>;
}

export default function RootLayoutClient({ children }) {
    return (
        <Provider store={store}>
            <AppContent>{children}</AppContent>
        </Provider>
    );
}
