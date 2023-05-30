import db from "@/app/lib/db";
import Post from "@/app/models/Post";
import { verifyJwtToken } from "@/app/lib/jwt";

async function GET(req) {
  await db.connect();

  try {
    const posts = await Post.find({}).populate("adminId");
    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(null), { status: 500 });
  }
}

async function POST(req) {
  await db.connect();

  const accessToken = req.headers.get("authorization");
  const token = accessToken.split(" ")[1];
  const decodedToken = verifyJwtToken(token);

  if (!accessToken || !decodedToken) {
    return new Response(
      JSON.stringify({ message: "Unauthorized (wrong or expired token)" }),
      { status: 401 }
    );
  }

  try {
    const body = await req.json();
    const newPost = await Post.create(body);
    return new Response(JSON.stringify(newPost), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify(error.message), { status: 500 });
  }
}
