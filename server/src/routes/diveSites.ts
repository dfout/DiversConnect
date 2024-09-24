import { Router, Request, Response } from "express";
import DiveSite from "../models/DiveSite";

const router = Router();

// Create a new dive site
router.post("/", async (req: Request, res: Response) => {
  const {
    name,
    location,
    description,
    depth_range,
    conditions,
    difficulty_level,
  } = req.body;

  try {
    const newDiveSite = new DiveSite({
      name,
      location,
      description,
      depth_range,
      conditions,
      difficulty_level,
    });

    await newDiveSite.save();
    res.status(201).json(newDiveSite);
  } catch (error) {
    res.status(500).json({ error: `${error}` });
  }
});

// Get all dive sites
router.get("/", async (_req: Request, res: Response) => {
  try {
    const diveSites = await DiveSite.find().exec();
    res.status(200).json(diveSites);
  } catch (error) {
    res.status(500).json({ error: `${error}` });
  }
});

// Get a single dive site by ID
router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const diveSite = await DiveSite.findById(id).exec();
    if (!diveSite) {
      return res.status(404).json({ error: "Dive site not found" });
    }
    res.status(200).json(diveSite);
  } catch (error) {
    res.status(500).json({ error: `${error}` });
  }
});

// Update a dive site by ID
router.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    name,
    location,
    description,
    depth_range,
    conditions,
    difficulty_level,
  } = req.body;

  try {
    const updatedDiveSite = await DiveSite.findByIdAndUpdate(
      id,
      {
        name,
        location,
        description,
        depth_range,
        conditions,
        difficulty_level,
      },
      { new: true } // Return the updated document
    );

    if (!updatedDiveSite) {
      return res.status(404).json({ error: "Dive site not found" });
    }

    res.status(200).json(updatedDiveSite);
  } catch (error) {
    res.status(500).json({ error: `${error}` });
  }
});

// Delete a dive site by ID
router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletedDiveSite = await DiveSite.findByIdAndDelete(id);
    if (!deletedDiveSite) {
      return res.status(404).json({ error: "Dive site not found" });
    }

    res.status(200).json({ message: "Dive site successfully deleted" });
  } catch (error) {
    res.status(500).json({ error: `${error}` });
  }
});

export default router;
