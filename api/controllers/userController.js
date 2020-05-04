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
      name,
      bio,
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
  //check to see if theres a db first
  if (!users.userData) {
    res
      .status(500)
      .json({ errorMessage: "The user information could not be retrieved." });
  }
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

module.exports.editUser = (req, res) => {
  const userId = req.params.userId;
  const { name, bio } = req.body;

  //check to see if theres a db first
  if (!users.userData) {
    res
      .status(500)
      .json({ errorMessage: "The user information could not be retrieved." });
  }
  //find the user
  const foundUser = users.userData.filter((user) => {
    return user.id === userId;
  });

  if (foundUser.length > 0) {
    //if no name or bio provided return error
    if (!name && !bio) {
      res
        .status(400)
        .json({ errorMessage: "Please provide name and bio for the user." });
    } else {
      //if name and bio provided update the users info
      const updatedUser = {
        name,
        bio,
        id: foundUser[0].id,
      };
      //if updated user object exits return the document
      if (updatedUser) {
        //update the user data
        users.userData = users.userData.map((user) => {
          if (user.id === updatedUser.id) {
            return updatedUser;
          } else {
            return user;
          }
        });
        res.status(200).json(users.userData);
      } else {
        res.status(500).json({
          errorMessage: "The user information could not be modified.",
        });
      }
    }
  } else {
    res
      .status(404)
      .json({ message: "The user with the specified ID does not exist." });
  }
};
