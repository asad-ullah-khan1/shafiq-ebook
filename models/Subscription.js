// models/Subscription.js
import mongoose from 'mongoose';

const SubscriptionSchema = new mongoose.Schema({
    tier: {
        type: String,
        required: true,
        enum: ['tier1', 'tier2'],
    },
    price: {
        type: Number,
        required: true,
    },
    features: [{
        type: String,
    }],
    description: {
        type: String,
        required: true,
    },
});

export default mongoose.models.Subscription || mongoose.model('Subscription', SubscriptionSchema);