import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 9000;

app.use(cors({ origin: "http://localhost:9000/" })); 
app.use(express.json());

const client = new MongoClient(process.env.MONGO_URI);
let db;

async function connectDB() {
  await client.connect();
  db = client.db("Masterbase");
  console.log("Connected to MongoDB");
}

connectDB().then(() => {
  app.listen(port, () => console.log(`Listening on port ${port}`));
});