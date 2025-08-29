import dotenv from "dotenv";
import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

dotenv.config();

const app = express();
const port = process.env.PORT || 9000;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

const client = new MongoClient(process.env.MONGO_URI);
let db;

async function connectDB() {
  await client.connect();
  db = client.db("Masterbase");
  console.log("Connected to MongoDB");

  app.post("/register", async (req, res) => {
    const newUser = {
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
      image: req.body.image,
    };

    let check = await db
      .collection("Users")
      .find({ email: newUser.email })
      .count();
    if (check > 0) {
      console.log("Korisnik postoji");
    } else {
      let result = await db.collection("Users").insertOne(newUser);
      console.log("Result", result);
      res.json(result);
    }
  });

  app.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await db.collection("Users").findOne({ email });
      if (!user) {
        return res.status(404).json({ error: "User not found!" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: "Invalid password!" });
      }

      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET || "default_secret",
        {
          algorithm: "HS512",
          expiresIn: "7d",
        }
      );

      const { password: _, ...safeUser } = user;

      return res.json({
        message: "Login successful!",
        token,
        userData: safeUser,
      });
    } catch (error) {
      console.error("Login error:", error);
      return res
        .status(500)
        .json({ error: "Server error. Please try again later." });
    }
  });
}

connectDB().then(() => {
  app.listen(port, () => console.log(`Listening on port ${port}`));
});