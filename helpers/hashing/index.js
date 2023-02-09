import bcrypt from "bcrypt";

export async function hashing(password) {
  password = await bcrypt.hash(password, 10);
  return password;
}
export function hashCompare(enterPassword, password) {
  password = bcrypt.compare(enterPassword, password);
  return password;
}
