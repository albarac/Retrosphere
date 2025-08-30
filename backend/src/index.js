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
    try {
      const { username, email, password, image } = req.body;

      const existingUser = await db.collection("Users").findOne({
        $or: [{ email }, { username }],
      });

      if (existingUser) {
        return res.status(400).json({
          error: true,
          message:
            existingUser.email === email
              ? "Email already exists"
              : "Username already exists",
        });
      }
      const hashedPassword = bcrypt.hashSync(password, 10);

      const newUser = {
        username,
        email,
        password: hashedPassword,
        image,
      };

      const result = await db.collection("Users").insertOne(newUser);

      res.json({
        success: true,
        userId: result.insertedId,
        message: "User registered successfully",
      });
    } catch (err) {
      console.error("Register error:", err);
      res.status(500).json({ error: true, message: "Server error" });
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

  app.put("/users/:id/avatar", async (req, res) => {
    try {
      const { id } = req.params;
      const { avatar } = req.body;

      const result = await db
        .collection("Users")
        .updateOne({ _id: new ObjectId(id) }, { $set: { image: avatar } });

      if (result.modifiedCount === 1) {
        return res.json({ success: true, avatar });
      } else {
        return res
          .status(400)
          .json({ success: false, message: "Update failed" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: "Server error" });
    }
  });

  app.post("/newPost", async (req, res) => {
    try {
      const { title, content, category, userId } = req.body;

      if (!title || !content || !userId || !category) {
        return res
          .status(400)
          .json({ success: false, message: "Missing fields" });
      }

      const newPost = {
        title,
        content,
        category,
        userId,
        date: new Date(),
        comments: [],
      };

      const result = await db.collection("Posts").insertOne(newPost);
      res.json({ success: true, postId: result.insertedId });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: "Server error" });
    }
  });

  app.get("/posts", async (req, res) => {
    try {
      const posts = await db
        .collection("Posts")
        .aggregate([
          {
            $addFields: {
              userIdObj: { $toObjectId: "$userId" },
            },
          },
          {
            $lookup: {
              from: "Users",
              localField: "userIdObj",
              foreignField: "_id",
              as: "userInfo",
            },
          },
          { $unwind: "$userInfo" },

          {
            $project: {
              userIdObj: 0,
              "userInfo.password": 0,
            },
          },
          { $sort: { date: -1 } },
        ])
        .toArray();

      res.json(posts);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Something went wrong" });
    }
  });
}

connectDB().then(() => {
  app.listen(port, () => console.log(`Listening on port ${port}`));
});