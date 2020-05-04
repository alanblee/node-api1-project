const express = require("express"),
  router = express.Router(),
  user = require("../controllers/userController");

//POST user
router.route("/").post(user.newUser);

//GET user
router.route("/").get(user.getUser);



module.exports = router;