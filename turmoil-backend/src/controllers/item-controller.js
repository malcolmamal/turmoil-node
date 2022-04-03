import { StatusCodes } from 'http-status-codes';
import fetch from 'node-fetch';
import JavaServerService, {
  API_PATH,
} from '../services/java-server-service.js';
import Item from '../models/item/Item.js';
import Attribute from '../models/item/Attribute.js';

export const itemGenerateAndPersist = async (req, res) => {
  const result = await fetch(`${API_PATH}/json/jsonGenerateItem/50`);

  const jsonResponse = await result.json();

  jsonResponse.id = null;
  jsonResponse.userId = req?.account?.id || 1;

  const item = await Item.create(jsonResponse);

  jsonResponse.attributes.forEach((attribute) =>
    Attribute.create({ ...attribute, ...{ itemId: item.id } }),
  );

  res.status(StatusCodes.CREATED).send({ item, jsonResponse });
};

export const itemFetch = async (req, res) => {
  const item = await Item.findByPk(req.params.id, { include: Attribute });

  res.status(StatusCodes.CREATED).send(item);
};

export const itemPutToStash = async (req, res) => {
  const item = await Item.findByPk(req.params.id, { include: Attribute });

  const jsonResult = JSON.stringify(item.toJSON());

  const response = await JavaServerService.itemToStash(jsonResult);

  res
    .status(StatusCodes.CREATED)
    .send({ ...response, ...{ express: item.toJSON() } });
};
