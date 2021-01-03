const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema(
    {
        company: {
            type: String,
            required: true
        },
        package: {
            type: String,
            required: true
        },
        typeOffer: {
            type: String,
            required: true
        },
        role: {
            type: String,
            required: true
        },
        rounds: {
            type: Number,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        creator: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Blog', blogSchema);