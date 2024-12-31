import Address from '../models/Address.js';

export const addAddress = async (req, res) => {
    try {
        const { userId } = req.user;
        const { latitude, longitude,houseNumber, isFavorite=false, street, address, category = 'other' } = req.body;

        if (!latitude || !longitude || !street || !houseNumber) {
            return res.status(400).json({
                success: false,
                message: 'Latitude, longitude, and street are required fields.',
            });
        }

        const newAddress = new Address({
            userId,
            latitude,
            longitude,
            street,
            address, // Optional field
            category,
            isFavorite,
            houseNumber,
            ...req.body,
        });

        await newAddress.save();

        res.status(201).json({
            success: true,
            message: 'Address created successfully',
            address: newAddress,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: 'Error creating address',
        });
    }
};
