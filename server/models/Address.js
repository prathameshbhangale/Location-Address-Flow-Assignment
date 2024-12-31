import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  houseNumber: {
    type: String,
    required: false,
  },
  address: {
    type: String,
    required: false,
  },
  street: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['Home', 'Office', 'Friends & Family', 'not defined'],
    default: 'not defined',
  },
  isFavorite: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

addressSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const Address = mongoose.model('Address', addressSchema);

export default Address;
