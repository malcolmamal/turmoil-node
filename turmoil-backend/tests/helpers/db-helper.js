import initUsers from '../fixtures/user-fixture.js';
import User from '../../src/models/User.js';
import Attribute from '../../src/models/item/Attribute.js';
import Item from '../../src/models/item/Item.js';

export const reset = async () => {
  await Attribute.destroy({ truncate: true, cascade: true });
  await Item.destroy({ truncate: true, cascade: true });
  await User.destroy({ truncate: true, cascade: true });
  await initUsers();
};

export default {
  reset,
};
