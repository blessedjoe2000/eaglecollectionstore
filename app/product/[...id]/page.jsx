import FeaturedProduct from "@/app/component/Product";
import { mongooseConnect } from "@/app/lib/connectDb";
import Product from "@/app/model/Product";
import { usePathname } from "next/navigation";

export default async function ProductPage({ product }) {
  product = await getProductProps();
  return (
    <div>
      <FeaturedProduct product={product} />
    </div>
  );
}

//using server side props
export async function getProductProps() {
  await mongooseConnect();

  // console.log("url", req);

  const productId = "6513a6278f4713d8ef861a11";
  const product = await Product.findById(productId);
  return JSON.parse(JSON.stringify(product));
}
