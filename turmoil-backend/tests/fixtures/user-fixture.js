import User from '../../src/models/User.js';

const users = [
  {
    email: 'aaa@aaa.pl',
    name: 'Malcolm',
    password: '$2b$12$.0p8.tcQovwEceEHqy4AqOndGGkCcF32NcHCQwJjUUu92bjoji9c6',
  },
  {
    email: 'malcolm.mal.reynolds@gmail.com',
    name: 'Dexter Morgan',
    password: '$2b$12$TNrHL6p/kl2RspEBV1p4juqkWckf0hecK5XsmZPeQdJvugbFzfvDC',
  },
];

export const getTestUserByEmail = (email) => users.find((user) => user.email === email);

export default async () => {
  // eslint-disable-next-line no-return-await
  const promises = users.map(async (user) => await User.create(user));
  // eslint-disable-next-line no-return-await
  return await Promise.all(promises);
};
