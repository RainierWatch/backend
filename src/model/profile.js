'use strict';

import createError from 'http-errors';
import Mongoose, { Schema } from 'mongoose';

const profileSchema = new Schema({
  account_id: {
    type: Schema.Types.ObjectId,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: () => new Date(),
  },
});

const Profile = Mongoose.model('profile', profileSchema);

// method to create new Profile
Profile.create = request => {
  if (
    !request.body.firstName ||
    !request.body.lastName) {
    return Promise.reject(createError(400, '__VALIDATION__ missing firstName or lastName'));
  }

  return new Profile({
    // using user email
    account_id: request.user._id,
    email: request.user.email,
    firstName: request.body.firstName,
    lastName: request.body.lastName,
  })
    .save()
    .then(profile => {
      // attaching profile id to user model and saving it
      request.user.profile = profile._id;
      return request.user.save()
        .then(() => profile);
    });
};

// method to get user Profile
Profile.fetchProfile = request => {
  return Profile.findById(request.user.profile)
    .then(profile => {
      if (!profile) {
        return Promise.reject(createError(404, '__ERROR__ profile not found'));
      }
      return profile;
    });
};

// method to delete user Profile
Profile.delete = request => {
  return Profile.findByIdAndRemove(request.user.profile)
    .then(() => 204);
};

// method to update user profile
Profile.update = request => {
  let options = { new: true, runValidators: true };
  return Profile.findByIdAndUpdate(
    request.user.profile,
    request.body,
    options,
  )
    .then(profile => {
      if (!profile) {
        return Promise.reject(createError(400, '__ERROR__ profile not found'));
      }

      return profile;
    });
};

export default Profile;
