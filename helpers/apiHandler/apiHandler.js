import dbConnect from "@/lib/dbConnect";
import nextConnect from "next-connect";

export function createHandler(...middleware) {
  return nextConnect().use(dbConnect, ...middleware);
}
