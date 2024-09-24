import express, { Express, Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import testRoutes from "./routes/testRoutes";
import userRoutes from "./routes/users";
import postRoutes from "./routes/posts"
import diveSiteRoutes from "./routes/diveSites"
import diveRoutes from "./routes/dives"
import eventRoutes from "./routes/events";

dotenv.config();

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const uri: string =
  process.env.MONGODB_URI || "mongodb://@127.0.0.1:27017/diversConnect/";

(async () => {
  try {
    await mongoose.connect(uri);
    console.log("Connected to the database");
  } catch (error) {
    console.error(error);
  }
})();


// Use the test routes
app.use("/api/tests", testRoutes);

//Use the user routes
app.use("/api/users", userRoutes);

//Use the post routes
app.use("/api/posts", postRoutes);

//Use the dive site routes
app.use("/api/sites", diveSiteRoutes);

//Use the dive site routes
app.use("/api/dives", diveRoutes);

//Use the event routes
app.use("/api/events", eventRoutes);

// Health check endpoint
app.get("/health", (_req: Request, res: Response) => {
  res.status(200).send("Server is running");
});

const PORT: string | number = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
