import NewProduct from "@/app/component/NewProduct";
import { getNewProducts } from "@/app/page";

export default async function page() {
  const newProducts = await getNewProducts();
  return <NewProduct newProducts={newProducts} />;
}
