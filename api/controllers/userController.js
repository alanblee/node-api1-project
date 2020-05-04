const shortId = require("shortid");
const users = require("../data/userData");

//new user
module.exports.newUser = (req, res) => {
  const { name, bio } = req.body;

  if (!name && !bio) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  } else {
    const newUser = {
      name: req.body.name,
      bio: req.body.bio,
      id: shortId.generate(),
    };
    if (newUser) {
      users.userData.push(newUser);
      res.status(201).json(users.userData);
    } else {
      res.status(500).json({
        errorMessage:
          "There was an error while saving the user to the database",
      });
    }
  }
};

//get user
module.exports.getUser = (req, res) => {
  if (!users.userData) {
    res
      .status(500)
      .json({ errorMessage: "The users information could not be retrieved." });
  } else {
    res.status(200).json(users.userData);
  }
};

//get single user by id
module.exports.getSingleUser = (req, res) => {
  const userId = req.params.userId;
  const foundUser = users.userData.filter((user) => {
    return user.id === userId;
  });
  if (foundUser.length > 0) {
    res.status(200).json(foundUser[0]);
  } else {
    res
      .status(404)
      .json({ message: "The user with the specified ID does not exist." });
  }
};
