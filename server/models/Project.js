const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    fundingGoal: {
        type: Number,
        required: true,
    },
    currentFunding: {
        type: Number,
        default: 0,
    },
    time: {
        type: Date,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    images: {
        type: [String],
        required: true,
    },
    rewards: {
        type: [
            {
                title: String,
                description: String,
                minimumPledge: Number,
                estimatedDelivery: Number,
            },
        ],
    },
    updates: {
        type: [
            {
                title: String,
                message: String,
                createdAt: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    backersCount: {
        type: Number,
        default: 0,
    },
    backers: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
            amount: Number,
        },
    ],
    completionPercentage: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;