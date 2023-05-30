import db from "@/app/lib/db";
import bcrypt from "bcrypt";
import Admin from "@/app/models/Admin";

export async function POST(req) {
  try {
    await db.connect();

    const { name, email, password: pass } = await req.json();

    const adminExist = await Admin.findOne({ email });
    if (!adminExist) {
      const hashedPassword = await bcrypt.hash(pass, 10);

      const newAdmin = await Admin.create({
        name,
        email,
        password: hashedPassword,
      });

      const { password, ...admin } = newAdmin._doc;

      return new Response(JSON.stringify(admin), {
        status: 201,
      });
    }
    throw new Error("user already exist");
  } catch (error) {
    return new Response(JSON.stringify(error.message), { status: 500 });
  }
}
