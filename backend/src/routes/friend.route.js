import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import {
  getUserFriends,
  getRecommendedUsers,
  getOutgoingFriendRequests,
  sendFriendRequest,
} from "../controllers/friend.controller.js";

const router = express.Router();

// ✅ Get logged-in user's friends
router.get("/", protectRoute, getUserFriends);

// ✅ Get recommended users for friendship
router.get("/recommended", protectRoute, getRecommendedUsers);

// ✅ Get outgoing friend requests
router.get("/requests/outgoing", protectRoute, getOutgoingFriendRequests);

// ✅ Send a friend request
router.post("/request/:id", protectRoute, sendFriendRequest);

export default router;

