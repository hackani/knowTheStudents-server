const registrationData = require("../mongooseModals/registrationModal");
const bcrypt = require("bcrypt");
const home = async (req, res) => {
  res.send("this is from auth yrouters");
};

const registration = async (req, res) => {
  try {
    const { firstname, lastname, username, contact, email, password } =
      req.body;

    const exists = await registrationData.findOne({ email });
    if (exists) {
      res.status(403).json({ msg: "user already exists" });
    } else {
      const hashed_password = await bcrypt.hash(password, 2);
      const uploadedData = await registrationData.create({
        firstname,
        lastname,
        username,
        contact,
        email,
        password: hashed_password,
      });
      res.status(200).json({
        msg: "data uploaded successfully",
        jsonWebToken: await uploadedData.createJWT_Token(),
        data: uploadedData,
      });
    }
  } catch (error) {
    res.status(401).json({ msg: "error occured" });
  }
};

const login = async (req, res) => {
  try {
    //  res.status(200).send("done");
    const { email, password } = req.body;
    const availableData = await registrationData.findOne({ email });
    const correctPassword = await bcrypt.compare(
      password,
      availableData.password
    );
    if (availableData !== null) {
      if (correctPassword) {
        res.status(201).json({
          // data: availableData,
          token: await availableData.createJWT_Token(),
          userId: availableData._id.toString(),
        });
      } else {
        res.status(401).json({ password_status: "The passsword is incorrect" });
      }
    } else {
      res.status(400).json({ msg: "user doesn't exists" });
    }

    // res.status(200).json({data: availableData.password});
  } catch (error) {
    console.log("Error:-", error);
  }
};

const user = async(req,res)=>{
  try{
    const userData = req.user
    console.log("userData from userFN",userData)
    res.status(200).json({data:userData})  
  }catch(err){
    res.status(400).json({message:"error occured from user endpoint"})
  }  
}
module.exports = { home, registration, login,user };

// •	First Name  -- **
// •	Last Name  --
// •	Contact No.--
// •	Username --
// •	Email id-- **
// •	Password
