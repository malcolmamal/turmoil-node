module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.bulkInsert('users', [{
      email: 'aaa@aaa.pl',
      name: 'Malcolm',
      password: '$2b$12$.0p8.tcQovwEceEHqy4AqOndGGkCcF32NcHCQwJjUUu92bjoji9c6',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      email: 'malcolm.mal.reynolds@gmail.com',
      name: 'Dexter Morgan',
      password: '$2b$12$TNrHL6p/kl2RspEBV1p4juqkWckf0hecK5XsmZPeQdJvugbFzfvDC',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  async down(queryInterface, DataTypes) {
    await queryInterface.bulkDelete('users', null, {});
  },
};
