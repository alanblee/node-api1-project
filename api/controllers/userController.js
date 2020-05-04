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
  if (!userData) {
    res
      .status(500)
      .json({ errorMessage: "The users information could not be retrieved." });
  } else {
    res.status(200).json(userData);
  }
};
