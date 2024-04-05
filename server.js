const express = require("express");
const cors = require("cors");
const app = express();
const registrationRouter = require("./router/contact-router");
const connectDB = require("./dbConnect/dataBase");
const corss = {
  origin: "http://localhost:3000",
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
}
app.use(cors(corss))
app.use(express.json());

app.use("/registration", registrationRouter);
// app.listen(8000,()=>{  
//     console.log("working properly")
// })
  
connectDB()
  .then(() => {
    app.listen(8080, () => {
      console.log("server started");
    });
  })
  .catch((err) => {
    console.log("there was an error while connecting to the database", err);
  });
