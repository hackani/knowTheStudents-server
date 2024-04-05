const registrationData = require("../mongooseModals/registrationModal");
const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  const rawToken = req.header("Authorization");
  console.log("rawtoken",rawToken);
  if (!rawToken) {
    return res.status(200).json({
      msg: "Token not Provided",
    });
  }
  const token = rawToken.replace("Bearer", "").trim();

  if (token) {
    console.log(`token is ${token}`);
  }

  try {
    const isVerified = jwt.verify(token, "y");
    // console.log(isVerified);
    console.log("Token isVerified AND it's mentioned above.");
    const userData = await registrationData.findOne({
      email: isVerified.email,
    });
    // console.log(userData)
    if (!userData) {
      console.log("failed to fetch Data");
    } else {
      console.log("got the user Data");
    }
    req.user = userData;
    req.token = token;
    req.id = userData._id;
    next();
  } catch (err) {
    console.log("error in Authentication");
    res
      .status(401)
      .json({ msg: "error in getting the data in authMiddleware" });
  }
};

module.exports = { verifyToken };
