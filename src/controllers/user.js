var User = require('../models/dog');

/**
 * List Users
 */
exports.list = (req, h) => {
  return User.find({}).exec().then((user) => {

    return { users: user };

  }).catch((err) => {

    return { err: err };

  });
}

/**
 * Get user by ID
 */
exports.get = (req, h) => {

  return User.findById(req.params.id).exec().then((user) => {

    if (!user) return { message: 'user not Found' };

    return { user: user };

  }).catch((err) => {

    return { err: err };

  });
}


/**
 * POST a user
 */
exports.create = (req, h) => {

  const userData = {
    email: req.payload.email,
    username: req.payload.username,
    passwordHash: req.payload.passwordHash,
    tokenSeed: req.payload.tokenSeed,
    profile: req.payload.profile
  };

  return User.create(userData).then((user) => {

    return { message: "user created successfully", user: user };

  }).catch((err) => {

    return { err: err };

  });
}

/**
 * PUT | Update user by ID
 */
exports.update = (req, h) => {

  return User.findById(req.params.id).exec().then((user) => {

    if (!user) return { err: 'user not found' };

    user.email = req.payload.email;
    user.username = req.payload.username;
    user.passwordHash = req.payload.passwordHash;
    user.tokenSeed = req.payload.tokenSeed;
    user.profile = req.payload.profile;

    user.save(userData);

  }).then((data) => {

    return { message: "user data updated successfully" };

  }).catch((err) => {

    return { err: err };

  });
}

/**
 * Delete user by ID
 */
exports.remove = (req, h) => {

  return User.findById(req.params.id).exec(function (err, user) {

    if (err) return { dberror: err };
    if (!user) return { message: 'user not found' };

    user.remove(function (err) {
      if (err) return { dberror: err };

      return { success: true };
    });
  });
}