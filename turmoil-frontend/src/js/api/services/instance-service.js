import { Axios } from '../../core/turmoil-axios';

const servicePrefix = 'instance';

export const initializeEnemyUnitsAction = async () => await Axios.post(`${servicePrefix}/initializeEnemyUnits`);

export const initializeFriendlyUnitsAction = async () => await Axios.post(`${servicePrefix}/initializeFriendlyUnits`);

export const initializeEquipmentAction = async () => await Axios.get(`${servicePrefix}/initializeEquipment`);

export const initializeStashAction = async () => await Axios.get(`${servicePrefix}/initializeStash`);

export const onPolygonAction = async (polygonId) => await Axios.block().get(`${servicePrefix}/instanceActionOnPosition/${polygonId}`);
