import { Axios } from '../../core/turmoil-axios';

const servicePrefix = 'character';

export const unequipAction = async (ident) => await Axios.block().get(`${servicePrefix}/unequip/${ident}`);

export const equipAction = async (ident) => await Axios.block().get(`${servicePrefix}/equip/${ident}`);

export const stateAction = async () => await Axios.get(`${servicePrefix}/state`);
