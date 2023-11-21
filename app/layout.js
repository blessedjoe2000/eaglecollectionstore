import "./globals.css";
import { CartContextProvider } from "./component/CartContext";

export const metadata = {
  title: "Eagle Collection Store Admin",
  description:
    "online store for all African fashion attires, jewelries and accessories",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="bg-light-pink">
      <body>
        <CartContextProvider>{children}</CartContextProvider>
      </body>
    </html>
  );
}
