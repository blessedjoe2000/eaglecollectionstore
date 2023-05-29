"use client";

import Footer from "./component/Footer/Footer";
import Header from "./component/Header/Header";
import styles from "./page.module.css";
import { ChakraProvider } from "@chakra-ui/react";

export default function Home() {
  return (
    <>
      <ChakraProvider>
        <Header />
        <main className={styles.main}></main>
        <Footer />
      </ChakraProvider>
    </>
  );
}
