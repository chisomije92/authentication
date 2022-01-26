import { hashedPassword } from "../../../helpers/auth";
import connectToDatabase from "../../../helpers/db";

async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }
  const data = req.body;

  const { email, password } = data;

  if (
    !email ||
    !email.includes("@") ||
    !password ||
    password.trim().length < 7
  ) {
    res.status(422).json({
      message: "Invalid input - pasword should at least be 7 characters long!",
    });
    return;
  }

  const hashPassword = await hashedPassword(password);

  const client = await connectToDatabase();
  const db = client.db();
  const result = await db
    .collection("users")
    .insertOne({ email: email, password: hashPassword });

  res.status(201).json({ message: "User created!" });
}

export default handler;
