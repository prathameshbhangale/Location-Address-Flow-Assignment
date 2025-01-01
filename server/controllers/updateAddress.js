import Address from '../models/Address.js';

export const updateAddress = async (req, res) => {
    try {
        const { userId } = req.user;
        const { id } = req.query; // Extract address ID from request parameters
        const { latitude, longitude, houseNumber, street, address, category, isFavorite } = req.body;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'Address ID is required.',
            });
        }

        // Find the address by ID and ensure it belongs to the authenticated user
        const existingAddress = await Address.findOne({ _id: id, userId });
        if (!existingAddress) {
            return res.status(404).json({
                success: false,
                message: 'Address not found or does not belong to the user.',
            });
        }

        // Update address fields if provided in the request body
        if (latitude !== undefined) existingAddress.latitude = latitude;
        if (longitude !== undefined) existingAddress.longitude = longitude;
        if (houseNumber !== undefined) existingAddress.houseNumber = houseNumber;
        if (street !== undefined) existingAddress.street = street;
        if (address !== undefined) existingAddress.address = address;
        if (category !== undefined) existingAddress.category = category;
        if (isFavorite !== undefined) existingAddress.isFavorite = isFavorite;

        const updatedAddress = await existingAddress.save();

        res.status(200).json({
            success: true,
            message: 'Address updated successfully',
            address: {
                _id: existingAddress._id,
                latitude: existingAddress.latitude,
                longitude: existingAddress.longitude,
                address: existingAddress.address,
                street: existingAddress.street,
                category: existingAddress.category,
                isFavorite: existingAddress.isFavorite,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: 'Error updating address',
        });
    }
};
