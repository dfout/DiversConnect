import User from "./models/User";
import Post from "./models/Post";
import Event from "./models/Event";
import Dive from "./models/Dive";
import MatchMaking from "./models/Matchmaking";
import DiveSite from "./models/DiveSite";

// Function to create and save a test user
export const createTestUser = async () => {
  const testUser = new User({
    username: "testuser123",
    email: "testuser@example.com",
    password: "securepassword",
    profile_visibility: "public",
    bio: "Just a test user for testing purposes!",
    location: "Test City, Test Country",
    certifications: ["Open Water Diver"],
    dive_hours: 50,
    friends: [],
    posts: [],
    karma: 0,
    badges: [],
    profile_picture: "https://example.com/profile-picture.jpg",
    banner_image: "https://example.com/banner-image.jpg",
  });

  return await testUser.save();
};

// Function to create and save a test post
export const createTestPost = async () => {
  const user = await User.findOne();
  if (!user) {
    throw new Error("No user found to assign as the author of the post");
  }

  const testPost = new Post({
    images: ["https://example.com/dive-image.jpg"],
    comments: [],
    likes: [],
    author: user._id, // Use the found user
    posted_at: new Date(),
    location: "Great Barrier Reef",
  });

  return await testPost.save();
};

// Function to create and save a test dive
export const createTestDive = async () => {
  const user = await User.findOne();
  if (!user) {
    throw new Error("No user found for this dive");
  }

  const diveSite = await DiveSite.findOne();
  if (!diveSite) {
    throw new Error("No dive site found to associate with this dive");
  }

  const testDive = new Dive({
    user: user._id, // Use the found user
    dive_site: diveSite._id, // Use the found dive site
    dive_date: new Date(),
    depth: 30,
    time_underwater: 60,
    notes: "Saw a beautiful reef and a few turtles!",
    date: Date.now(),
  });

  return await testDive.save();
};

// Function to create and save a test match
export const createTestMatch = async () => {
  const user1 = await User.findOne();
  if (!user1) {
    throw new Error("No user1 found");
  }

  const user2 = await User.findOne({ username: "anotheruser" });
  if (!user2) {
    throw new Error("No user2 found");
  }

  const testMatch = new MatchMaking({
    user1: user1._id, // Use the found user1
    user2: user2._id, // Use the found user2
    compatibility_score: 85,
  });

  return await testMatch.save();
};

// Function to create and save a test dive site
export const createTestDiveSite = async () => {
  const testDiveSite = new DiveSite({
    name: "Coral Bay",
    location: { country: "Australia", coordinates: { lat: 74.4, lng: 60 } },
    description: "A beautiful dive spot with vibrant coral reefs.",
    depth_range: { max_depth: 40, min_depth: 5 },
    conditions: "Clear waters, light currents",
    difficulty_level: "Beginner",
  });

  return await testDiveSite.save();
};

// Function to create and save a test event
export const createTestEvent = async () => {
  const testEvent = new Event({
    participants_needed: 4,
    location: "Bahamas",
    date_time: new Date("2024-10-15T10:00:00Z"),
    description: "In search of dive buddies for a Bahamas adventure!",
    requirements: ["Advanced certification"],
    gear: ["Scuba tanks", "Wetsuit"],
    skill_level: "Intermediate",
    safety_rating: 5,
    min_dive_hours: 100,
  });

  return await testEvent.save();
};
