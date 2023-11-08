import { mongooseConnect } from "@/app/lib/connectDb";
import Product from "@/app/model/Product";
import mongoose from "mongoose";

export async function GET(req) {
  await mongooseConnect();

  try {
    const productIds = await req.json();
    const allProductIds = await Product.find({ _id: productIds });

    return new Response(JSON.stringify(allProductIds), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error.message), { status: 500 });
  }
}

export async function POST(req) {
  await mongooseConnect();

  try {
    const data = await req.json();
    const ids = data.ids.map((id) => new mongoose.Types.ObjectId(id));
    const allProducts = await Product.find({ _id: { $in: ids } });

    return new Response(JSON.stringify(allProducts), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error.message), { status: 500 });
  }
}
