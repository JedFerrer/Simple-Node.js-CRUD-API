"use strict";

var validator = require('validator');
var Sequelize = require("sequelize");
var Book  = require('../models').Book;

var BookCreateForm = function(inputs) {
  var validators = [
    {
      field: 'title',
      rule: function(input) {
        if (! input) {
          return false;
        }
        return true;
      },
      message: 'Title is required.'
    },
    {
      field: 'description',
      rule: function(input) {
        if (! input) {
          return false;
        }
        return true;
      },
      message: 'Description is required.'
    }
  ];

  var form = {
    formErrors: [],

    save: function(cb) {
      var me = this;

      // validate
      validators.forEach(function(validator) {
        console.log(inputs[validator.field]);

        if (! validator.rule(inputs[validator.field])) {
          var error = {
            field: validator.field,
            message: validator.message
          };
          me.formErrors.push(error);
        }
      });

      if (me.formErrors.length > 0) {
        return cb(null, false);
      }

      // save to db
      Book.create({
        title: inputs.title,
        description: inputs.description
      }).then(function(book) {
        cb(null, book.toJSON());
      }).catch(function(err) {
        if (err instanceof Sequelize.ValidationError) {
          cb(err.errors);
        } else {
          cb(err);
        }
      });
    }
  };
  return form;
};

module.exports = BookCreateForm;
