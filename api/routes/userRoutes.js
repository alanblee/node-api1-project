const express = require("express"),
  router = express.Router(),
  user = require("../controllers/userController");

//POST user
router.route("/").post(user.newUser);

//GET user
router.route("/").get(user.getUser);

//GET user by id
router.route("/:userId").get(user.getSingleUser);
//PUT edit user by id
router.route("/:userId").put(user.editUser);
module.exports = router;
