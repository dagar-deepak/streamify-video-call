import User from "../models/User.js";

// @desc    Get user's friends
// @route   GET /api/friends
export const getUserFriends = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("friends", "-password");
    res.status(200).json(user.friends);
  } catch (error) {
    console.error("Error getting friends:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get recommended users (not friends and not self)
// @route   GET /api/friends/recommended
export const getRecommendedUsers = async (req, res) => {
  try {
    const allUsers = await User.find({
      _id: { $ne: req.user._id, $nin: req.user.friends },
    }).select("-password");

    res.status(200).json(allUsers);
  } catch (error) {
    console.error("Error getting recommended users:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get outgoing friend requests
// @route   GET /api/friends/requests/outgoing
export const getOutgoingFriendRequests = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("outgoingRequests", "-password");
    res.status(200).json(user.outgoingRequests || []);
  } catch (error) {
    console.error("Error getting outgoing friend requests:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Send a friend request
// @route   POST /api/friends/request/:id
export const sendFriendRequest = async (req, res) => {
  try {
    const sender = await User.findById(req.user._id);
    const recipient = await User.findById(req.params.id);

    if (!recipient) {
      return res.status(404).json({ message: "User not found" });
    }

    if (sender.friends.includes(recipient._id)) {
      return res.status(400).json({ message: "Already friends" });
    }

    // Simulate friend request logic — in real case, you'd create a FriendRequest model
    recipient.friends.push(sender._id);
    sender.friends.push(recipient._id);

    await recipient.save();
    await sender.save();

    res.status(200).json({ message: "Friend request sent successfully" });
  } catch (error) {
    console.error("Error sending friend request:", error);
    res.status(500).json({ message: "Server error" });
  }
};
