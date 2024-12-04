const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const connectSchema = new mongoose.Schema({
    connectId: {
        type: String,
        default: uuidv4,
        unique: true,
        required: true
    },
    advanceAmount: {
        type: Number,
    },
    samyRupees: {
        type: Number,
    },
    airWaste: {
        type: Number,
    },
    gressCount: {
        type: String,
    },
    gressAmount: {
        type: Number
    },
    addBlueOil: {
        type: String
    },
    addBlueOilAmount: {
        type: Number
    },
    anotherTimeGressName: {
        type: String,
    },
    anotherTimeValue: {
        type: Number,
    },
    extraName:{
        type:String
    },
    extraValue:{
        type:Number
    },
    total: {
        type: Number
    },
    grandTotal: {
        type: Number
    },
    anotherTimeAdvance: {
        type: Number
    },
    sencondAddBlueOil: {
        type: String
    },
    sencondOilAmount: {
        type: Number
    },
    secondTotal: {
        type: Number
    },
    finalTotal: {
        type: Number
    }
}, {
    collection: 'connect',
    timestamps: false
});

const Connect = mongoose.model('Connect', connectSchema);

module.exports = Connect;
