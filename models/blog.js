const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema(
    {
        company:{
            type: String,
            required: true
        },
        rounds:{
            type: Number,
            required: true
        },
        description:{
            type: String,
            required: true
        }
    }
);

module.exports = mongoose.model('Blog',blogSchema);