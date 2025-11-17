// ============================
// MONGOOSE SCHEMA FOR LOCATION
// ============================

import mongoose, {Schema} from 'mongoose'

const locationSchema = new Schema({
    userId: {
        type: String,
        required: true,
        index: true,
    },
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
    },
    city: {
        type: String,
        index: true,
    },
    state: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        index: true,
    }
},);

//compound index; fetch latest location by user quickly
locationSchema.index({
    userId: 1,
    createdAt: -1
});

export const Location = mongoose.model("Location", locationSchema);
