import { Axios } from '../../core/turmoil-axios';

export const initializeEnemyUnitsAction = async () => await Axios.post('instance/initializeEnemyUnits');

export const initializeFriendlyUnitsAction = async () => await Axios.post('instance/initializeFriendlyUnits');

export const initializeEquipmentAction = async () => await Axios.get('instance/initializeEquipment');

export const initializeStashAction = async () => await Axios.get('instance/initializeStash');

export const onPolygonAction = async (polygonId) => await Axios.block().get(`instance/instanceActionOnPosition/${polygonId}`);
