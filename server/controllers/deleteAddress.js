import Address from '../models/Address.js';

export const deleteAddress = async (req, res) => {
    try {
        const { userId } = req.user; // Retrieve userId from authenticated user
        const { id } = req.query; // Correctly access route parameter

        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'Address ID is missing.',
            });
        }

        const deletedAddress = await Address.findOneAndDelete({ _id: id, userId });

        if (!deletedAddress) {
            return res.status(404).json({
                success: false,
                message: 'Address not found.',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Address deleted successfully.',
            // data: deletedAddress,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: 'An error occurred while deleting the address.',
        });
    }
};
