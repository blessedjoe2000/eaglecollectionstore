import db from "@/app/lib/db";
import { verifyJwtToken } from "@/app/lib/jwt";
import Post from "@/app/models/Post";

export async function PUT(req, ctx) {
  db.connect();

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
    const post = await Post.findById(id);

    if (post.likes.includes(decodedToken._id)) {
      post.likes = post.likes.filter(
        (id) => id.toString() !== decodedToken._id.toString()
      );
    } else {
      post.like.push(decodedToken._id);
    }

    await post.save();

    return new Response({ message: "post liked" }, { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(null), { status: 500 });
  }
}
