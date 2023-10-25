const express = require('express')
const router = express.Router()
const db = require('../config/db')
const xlsx = require('xlsx')
const readXlsxFile = require('read-excel-file/node')
const fs = require('fs')
const path = require('path')
const multer = require('multer')
const fileUploads  = require('express-fileupload')
const csv = require("csvtojson");
const Patient = require('../models/patient')
const passport = require('passport')

const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, ('./uploads'))
    },
    filename: (req, file, cb)=>{
        cb(null, file.originalname)
    }
})

const upload = multer({
    storage,
})

// GET Home Page
router.get('/', async(req, res) => {
    const patients = await Patient.find()
    const count = patients.length
    res.render('pages/index', {patients, title:'Dashboard - InterView Questions', count})
})

router.get('/dashboard', async(req, res) => {
    const patients = await Patient.find()
    const count = patients.length
    res.render('pages/dashboard', {count, patients })
})

router.post('/import', upload.single('fileupload'), async(req, res) => {
    const wb = xlsx.readFile(req.file.path); 
    const sheets = wb.SheetNames;
    
    if(sheets.length > 0) {
        const data = xlsx.utils.sheet_to_json(wb.Sheets[sheets[0]]);
        const patient = data.map(row => ({
            firstname: row['firstname'],
            lastname: row['lastname'],
            dob: row['dob'],
            phonenumber: row['phonenumber']
        }))

        Patient.insertMany(patient)
    }
    res.render('pages/dashboard')
})


module.exports = router