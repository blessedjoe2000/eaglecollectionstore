"use client";

import { SessionProvider } from "next-auth/react";
import Footer from "./component/Footer/Footer";
import Header from "./component/Header/Header";
import { ChakraProvider } from "@chakra-ui/react";
import "./globals.css";
// import { Inter } from 'next/font/google'

// const inter = Inter({ subsets: ['latin'] })

const metadata = {
  title: "Eagle Collection Store",
  description:
    "online store for all African fashion attires, jewelries and accessories",
};

export default function RootLayout({ children, session }) {
  return (
    <html lang="en">
      <body className="">
        <SessionProvider session={session}>
          <ChakraProvider>
            <Header />
            {children}
            <Footer />
          </ChakraProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
