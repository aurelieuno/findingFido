const Sequelize = require('sequelize');

const sequelize = new Sequelize('postgres://bvjcwjye:YkiJ4pvf6lTtuJDyp8v23KqGQoeuasvL@baasu.db.elephantsql.com:5432/bvjcwjye', {
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

const Pet = sequelize.define('pet', {
  name: {
    type: Sequelize.STRING,
  },
  kind: {
    type: Sequelize.STRING,
  },
  characteristics: {
    type: Sequelize.STRING,
  },
  email_user: {
    type: Sequelize.STRING,
  },
});

module.exports.createPet = (name, kind, characteristics, place, userEmail, cb) => {
  Pet.sync().then(() =>
    Pet.create({
      name,
      kind,
      characteristics,
      place,
      email_user: userEmail,
    })
      .then(pet => cb(null, pet))
      .catch(err => cb(err)));
};

module.exports.getPet = (userEmail, cb) => {
  Pet.findOne({ where: { email_user: userEmail } })
    .then(pet => cb(null, pet))
    .catch(err => cb(err));
};
module.exports.getPetId = (id, cb) => {
  Pet.findOne({ where: { id } })
    .then(pet => cb(null, pet))
    .catch(err => cb(err));
};

module.exports.updatePet = (userEmail, updateKey, updateValue, cb) => {
  Pet.findOne({ where: { email_user: userEmail } })
    .then(pet => pet.updateAttributes({ updateKey: updateValue }))
    .then(updated => cb(null, updated))
    .catch(err => cb(err));
};
