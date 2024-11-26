'use client'
import store from "@/app/store/store"
import { Provider } from "react-redux"


export default function RootLayoutClient({children}) {
    return <Provider store={store}>{children}</Provider>
} 