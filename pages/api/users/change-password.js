import { getSession } from "next-auth/react";
import { hashedPassword, verifyPassword } from "../../../helpers/auth";
import connectToDatabase from "../../../helpers/db";

async function handler(req, res) {
  if (req.method !== "PATCH") {
    return;
  }
  const session = await getSession({ req: req });

  if (!session) {
    res.status(401).json({ message: "Not authenticated" });
    return;
  }

  const userEmail = session.user.email;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;

  const client = await connectToDatabase();
  const usersCollection = client.db().collection("users");
  const user = await usersCollection.findOne({ email: userEmail });

  if (!user) {
    res.status(401).json({ message: "User not found!" });
    client.close();
    return;
  }

  const currentPassword = user.password;

  const passwordAreEqual = await verifyPassword(oldPassword, currentPassword);

  if (!passwordAreEqual) {
    res
      .status(403)
      .json({ message: "Permission not granted for invalid parameters" });
    client.close();
    return;
  }

  const hashPassword = await hashedPassword(newPassword);

  const passwordsAreSame = await verifyPassword(oldPassword, hashPassword);

  if (passwordsAreSame) {
    res
      .status(403)
      .json({ message: "Old password and new password are the same" });
    client.close();
    return;
  }

  const result = await usersCollection.updateOne(
    { email: userEmail },
    { $set: { password: hashPassword } }
  );
  res.status(200).json({ message: "Password updated" });
  client.close();
}

export default handler;
