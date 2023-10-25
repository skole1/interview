// const mysql = require('mysql')
// module.exports = mysql.createConnection({
//     host: "localhost" || process.env.host,
//     user:"root" || process.env.user,
//     password:"" || process.env.password,
//     database:"exceldb" || process.env.database
// })

// module.exports = mongoose.connect('mongodb://localhost:27017/cuteFarm')
// .then(()=>console.log(`MongoDB Connected...`))
// .catch(err => console.log(err))

const mongoose = require('mongoose');

const connectDB = async () => {
  const conn = await mongoose.connect('mongodb://localhost:27017/interView');
  console.log(`MongoDB Connected:...`);
};

module.exports = connectDB;

