import { Inter } from "next/font/google";
import "./globals.css";
import { CartContextProvider } from "./component/CartContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Eagle Collection Store Admin",
  description:
    "online store for all African fashion attires, jewelries and accessories",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="bg-light-pink">
      <body className={inter.className}>
        <CartContextProvider>{children}</CartContextProvider>
      </body>
    </html>
  );
}
