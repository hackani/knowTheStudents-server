const express = require("express")
const router = express.Router()
// const verifyToken = require("../middlewares/verifyMiddleware")
const authMiddleware = require("../middlewares/authMiddleware")
const contactRouter = require("../authRouter/endPointFunctions")
const validate = require("../validators/auth-validator")
const verifyingFunction = require("../middlewares/verifyMiddleware")
// router.route("/").get(contactRouter.home);
router.route("/home").get(contactRouter.home);
router.route("/").post(verifyingFunction(validate),contactRouter.registration);
router.route("/login").post(contactRouter.login); // done
router.route("/user").get(authMiddleware.verifyToken,contactRouter.user);
module.exports = router  