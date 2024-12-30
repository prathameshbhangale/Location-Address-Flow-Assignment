import mongoose from 'mongoose';

const searchSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false,
  },
  query: {
    type: String,
    required: true,
  },
  latitude: {
    type: Number,
    required: false,
  },
  longitude: {
    type: Number,
    required: false,
  },
  searchedAt: {
    type: Date,
    default: Date.now,
  },
});

const RecentSearch = mongoose.model('RecentSearch', searchSchema);

export default RecentSearch;
