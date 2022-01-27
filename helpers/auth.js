import { compare, hash } from "bcrypt";

export async function hashedPassword(password) {
  const hashedPassword = await hash(password, 12);
  return hashedPassword;
}

export async function verifyPassword(password, hashedPassword) {
  const passwordIsValid = await compare(password, hashedPassword);
  return passwordIsValid;
}
