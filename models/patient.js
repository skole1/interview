const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const PatientSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    phonenumber: {
        type: String,
        required: true
    }

}, { timestamps: true })

//Create Collection
const Patient = mongoose.model('Patient', PatientSchema)

module.exports = Patient