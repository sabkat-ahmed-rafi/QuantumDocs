import localFont from "next/font/local";
import "./globals.css";
import {Providers} from "./providers";
import RootLayoutClient from "./components/Others/RootLayoutClient";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "QuantumDocs",
  description: "QuantumDocs is a real-time collaboration platform.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/favicon.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <RootLayoutClient>{children}</RootLayoutClient>
          <ToastContainer />
        </Providers>
      </body>
    </html>
  );
}
