import { Router, Request, Response } from "express";
import Post from "../models/Post";
import User from "../models/User";

const router = Router();

// Create a new post
router.post("/", async (req: Request, res: Response) => {
  const { images, authorId, title, description, location, comments, likes, posted_at, dive } =
    req.body;

  try {
    const author = await User.findById(authorId);
    if (!author) {
      return res.status(404).json({ error: "Author not found" });
    }

    const newPost = new Post({
      images,
      author: author._id,
      title, 
      description, 
      location,
      comments: comments || [],
      likes: likes || [],
      posted_at: posted_at || new Date(),
      dive: dive || null,
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: `${error}` });
  }
});

// Get all posts
router.get("/", async (_req: Request, res: Response) => {
  try {
    const posts = await Post.find().populate("author", "username email").exec();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: `${error}` });
  }
});

// Get a single post by ID
router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id)
      .populate("author", "username email")
      .exec();
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: `${error}` });
  }
});

// Update a post by ID
router.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, images, location, comments, likes, posted_at, dive } = req.body;

  try {
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      {
        title, 
        description,
        images,
        location,
        comments,
        likes,
        posted_at,
        dive,
      },
      { new: true } // Return the updated document
    );

    if (!updatedPost) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: `${error}` });
  }
});

// Delete a post by ID
router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletedPost = await Post.findByIdAndDelete(id);
    if (!deletedPost) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json({ message: "Post successfully deleted" });
  } catch (error) {
    res.status(500).json({ error: `${error}` });
  }
});

export default router;
