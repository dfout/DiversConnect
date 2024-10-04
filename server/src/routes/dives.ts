import { Router, Request, Response } from "express";
import Dive from "../models/Dive";
import DiveSite from "../models/DiveSite";

const router = Router();

// Create a new dive
router.post("/", async (req: Request, res: Response) => {
  const { diveSiteId, date, duration, depth, participants, time_underwater, notes } =
    req.body;

  try {

    const diveSite = await DiveSite.findById(diveSiteId);
    if (!diveSite) {
      return res.status(404).json({ error: "Dive site not found" });
    }

    const newDive = new Dive({
      dive_site: diveSite._id,
      date,
      duration: duration || null, 
      depth: participants || null,
      participants: participants || null,
      time_underwater,
      notes: notes || null
    });

    await newDive.save();
    res.status(201).json(newDive);
  } catch (error) {
    res.status(500).json({ error: `${error}` });
  }
});

// Get all dives
router.get("/", async (_req: Request, res: Response) => {
  try {
    const dives = await Dive.find()
      .populate("participants", "username")
      .populate("dive_site", "name")
      .exec();
    res.status(200).json(dives);
  } catch (error) {
    res.status(500).json({ error: `${error}` });
  }
});

// Get a single dive by ID
router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const dive = await Dive.findById(id)
      .populate("user")
      .populate("dive_site")
      .exec();
    if (!dive) {
      return res.status(404).json({ error: "Dive not found" });
    }
    res.status(200).json(dive);
  } catch (error) {
    res.status(500).json({ error: `${error}` });
  }
});

// Update a dive by ID
router.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { dive_date, depth, time_underwater, notes } = req.body;

  try {
    const updatedDive = await Dive.findByIdAndUpdate(
      id,
      { dive_date, depth, time_underwater, notes },
      { new: true } // Return the updated document
    );

    if (!updatedDive) {
      return res.status(404).json({ error: "Dive not found" });
    }

    res.status(200).json(updatedDive);
  } catch (error) {
    res.status(500).json({ error: `${error}` });
  }
});

// Delete a dive by ID
router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletedDive = await Dive.findByIdAndDelete(id);
    if (!deletedDive) {
      return res.status(404).json({ error: "Dive not found" });
    }

    res.status(200).json({ message: "Dive deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: `${error}` });
  }
});

export default router;
