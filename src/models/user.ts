import mongoose from "mongoose";
import { User } from "next-auth";

export const collection = mongoose.connection.db?.collection("User");
export default mongoose.models.User;
