const mongoose = require('mongoose');
const URI = "mongodb+srv://studentsData:kuldeepchavda@cluster0.mpscamc.mongodb.net/students_data?retryWrites=true&w=majority";

const connectDB = async () => {
  try {
    await mongoose.connect(URI); 
    console.log("connected  successfully.");
  } catch (error) {
    console.error(error);
    process.exit(0); 
  }
};
module.exports = connectDB   