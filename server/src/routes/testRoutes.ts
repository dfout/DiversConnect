import { Router, Request, Response } from "express";
import {
  createTestUser,
  createTestPost,
  createTestEvent,
  createTestDive,
  createTestMatch,
  createTestDiveSite,
} from "../testUtils"; // Import the utility functions

const router = Router();

// Route to create a test user
router.post("/create-test-user", async (_req: Request, res: Response) => {
  try {
    const newUser = await createTestUser();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: `${error}` });
  }
});

// Route to create a test post
router.post("/create-test-post", async (_req: Request, res: Response) => {
  try {
    const newPost = await createTestPost();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: `${error}` });
  }
});

// Route to create a test event
router.post("/create-test-event", async (_req: Request, res: Response) => {
  try {
    const newEvent = await createTestEvent();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ error: `${error}` });
  }
});

// Route to create a test dive
router.post("/create-test-dive", async (_req: Request, res: Response) => {
  try {
    const newDive = await createTestDive();
    res.status(201).json(newDive);
  } catch (error) {
    res.status(500).json({ error: `${error}` });
  }
});

// Route to create a test match
router.post("/create-test-match", async (_req: Request, res: Response) => {
  try {
    const newMatch = await createTestMatch();
    res.status(201).json(newMatch);
  } catch (error) {
    res.status(500).json({ error: "Error creating test match" });
  }
});

// Route to create a test dive site
router.post("/create-test-dive-site", async (_req: Request, res: Response) => {
  try {
    const newDiveSite = await createTestDiveSite();
    res.status(201).json(newDiveSite);
  } catch (error) {
    res.status(500).json({ error: `${error}` });
  }
});

export default router;
