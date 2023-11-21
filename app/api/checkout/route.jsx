import { mongooseConnect } from "@/app/lib/connectDb";
import Order from "@/app/model/Order";
import Product from "@/app/model/Product";
const stripe = require("stripe")(process.env.STRIPE_SK);

export async function GET(req) {
  await mongooseConnect();

  try {
    const data = await req.json();

    return new Response(JSON.stringify(""), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error.message), { status: 500 });
  }
}

export async function POST(req) {
  await mongooseConnect();

  try {
    const { name, email, phone, address, zipCode, country, cartProducts } =
      await req.json();
    const uniqueIds = [...new Set(cartProducts)];
    const productInfos = await Product.find({ _id: { $in: uniqueIds } });
    let line_items = [];

    for (const productId of uniqueIds) {
      const productInfo = productInfos.find(
        (product) => product._id.toString() === productId
      );
      const quantity =
        cartProducts.filter((id) => id === productId)?.length || 0;
      if (quantity && productInfo) {
        line_items.push({
          quantity,
          price_data: {
            currency: "USD",
            product_data: { name: productInfo.title },
            unit_amount: quantity * productInfo.price * 100,
          },
        });
      }
    }

    const orderInfo = await Order.create({
      line_items,
      name,
      email,
      phone,
      address,
      zipCode,
      country,
      paid: false,
    });

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      customer_email: email,
      success_url: process.env.PUBLIC_URL + "/cart?success=true",
      cancel_url: process.env.PUBLIC_URL + "/cart?canceled=true",
      metadata: { orderId: orderInfo?._id.toString() },
    });

    return new Response(
      JSON.stringify({
        url: session.url,
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify(error.message), { status: 500 });
  }
}
