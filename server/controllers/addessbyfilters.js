import Address from "../models/Address.js";

export const addessbyfilters = async (req, res) => {
  try {
    const { userId } = req.user; // Retrieve userId from the authenticated user
    const { home = false, office = false, friends = false, favourites = false, other = false } = req.body;

    // Build a list of categories to filter based on the query parameters
    const categories = [];
    if (home === "true") categories.push("Home");
    if (office === "true") categories.push("Office");
    if (friends === "true") categories.push("Friends & Family");
    if (other === "true") categories.push("Other");

    // Build the query object
    const query = {
      userId,
    };

    if (categories.length > 0) {
      query.category = { $in: categories }; // Match any of the selected categories
    }

    if (favourites === "true") {
      query.isFavorite = true; // Filter by favorite addresses
    }

    // Fetch addresses from the database
    const addresses = await Address.find(query);

    res.status(200).json({
      success: true,
      data: addresses,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching addresses.",
    });
  }
};
