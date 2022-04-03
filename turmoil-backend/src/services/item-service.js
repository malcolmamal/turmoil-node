import Item from '../models/item/Item.js';
import Attribute from '../models/item/Attribute.js';

const fetchFromStashForUser = async (user) =>
  await Item.findAll({ where: { userId: user.id }, include: Attribute });

export default fetchFromStashForUser;
