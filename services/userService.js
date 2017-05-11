'use strict';

var User = require('../models/user');

var userService = {};

userService.findById = function (id) {
  return User.findOne({id : id});
};

module.exports = userService;