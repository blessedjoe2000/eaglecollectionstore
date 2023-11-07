import Footer from "./component/Footer";
import Navbar from "./component/Navbar";
import NewProduct from "./component/NewProduct";
import FeaturedProduct from "./component/Product";
import { mongooseConnect } from "./lib/connectDb";
import Product from "./model/Product";

export default async function Home() {
  const product = await getProductProps();
  const newProducts = await getNewProducts();

  return (
    <main className="">
      <Navbar />
      <FeaturedProduct product={product} />
      <NewProduct newProducts={newProducts} />
      <Footer />
    </main>
  );
}

//using server side props
export async function getProductProps() {
  await mongooseConnect();
  const productId = "6513a6278f4713d8ef861a11";
  const product = await Product.findById(productId);
  return JSON.parse(JSON.stringify(product));
}

export async function getNewProducts() {
  await mongooseConnect();
  const newProducts = await Product.find({}, null, {
    sort: { _id: -1 },
    limit: 20,
  });
  return JSON.parse(JSON.stringify(newProducts));
}
