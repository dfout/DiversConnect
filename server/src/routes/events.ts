import { Router, Request, Response } from "express";
import Event from "../models/Event";

const router = Router();

// Create a new event
router.post("/", async (req: Request, res: Response) => {
  const {
    event_type,
    participants_needed,
    location,
    date_time,
    description,
    requirements,
    gear,
    skill_level,
    safety_rating,
    min_dive_hours,
  } = req.body;

  // Validate event_type
  if (!["in-search-of", "event"].includes(event_type)) {
    return res.status(400).json({ error: "Invalid event_type" });
  }

  try {
    const newEvent = new Event({
      event_type,
      participants_needed,
      location,
      date_time,
      description,
      requirements,
      gear,
      skill_level,
      safety_rating,
      min_dive_hours,
    });

    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ error: `${error}` });
  }
});

// Get all events
router.get("/", async (_req: Request, res: Response) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: `${error}` });
  }
});

// Get a single event by ID
router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ error: `${error}` });
  }
});

// Update an event by ID
router.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    event_type,
    participants_needed,
    location,
    date_time,
    description,
    requirements,
    gear,
    skill_level,
    safety_rating,
    min_dive_hours,
  } = req.body;

  // Validate event_type
  if (event_type && !["in-search-of", "event"].includes(event_type)) {
    return res.status(400).json({ error: "Invalid event type" });
  }

  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      {
        event_type,
        participants_needed,
        location,
        date_time,
        description,
        requirements,
        gear,
        skill_level,
        safety_rating,
        min_dive_hours,
      },
      { new: true } // Return the updated document
    );

    if (!updatedEvent) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(500).json({ error: `${error}` });
  }
});

// Delete an event by ID
router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletedEvent = await Event.findByIdAndDelete(id);
    if (!deletedEvent) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.status(200).json({ message: "Event sucessfully deleted" });
  } catch (error) {
    res.status(500).json({ error: `${error}` });
  }
});

export default router;
