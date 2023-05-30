import db from "@/app/lib/db";
import { verifyJwtToken } from "@/app/lib/jwt";
import Post from "@/app/models/Post";

export async function GET(req, ctx) {
  await db.connect();
  const id = ctx.params.id;

  try {
    const post = await Post.findById(id)
      .populate("adminId")
      .select("-password");
    return new Response(JSON.stringify(post), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(null), { status: 500 });
  }
}

export async function PATCH(req, ctx) {
  await db.connect();

  const id = ctx.params.id;

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
    const updateBody = await req.json();
    const post = await Post.findById(id)
      .populate("adminId")
      .select("-password");

    if (!post) {
      return new Response(
        JSON.stringify({ message: "no post found" }, { status: 403 })
      );
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { $set: { ...updateBody } },
      { new: true }
    );

    return new Response(JSON.stringify(updatedPost), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(null), { status: 500 });
  }
}

export async function DELETE(req, ctx) {
  await db.connect();

  const id = ctx.params.id;

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
    const post = await Post.findById(id)
      .populate("adminId")
      .select("-password");
    if (!post) {
      return new Response(
        JSON.stringify({ message: "no post found" }, { status: 403 })
      );
    }

    await Post.findOneAndDelete(post);

    return new Response(
      JSON.stringify({ message: "post deleted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify(null), { status: 500 });
  }
}
