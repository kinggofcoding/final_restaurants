'use strict'
const bcrypt = require('bcryptjs')
const users = require('../public/jsons/user.json').results
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Users',
      users.map((user) => ({
        name: user.name,
        email: user.email,
        password: bcrypt.hashSync(user.password, 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      }))
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null)
  },
}
