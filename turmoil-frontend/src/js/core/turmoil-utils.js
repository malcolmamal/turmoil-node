const Utils = {
  getCurrentDateTime() {
    const currentDate = new Date();
    return `${currentDate.toJSON().slice(0, 10)} ${
      currentDate.getHours()}:${
      currentDate.getMinutes()}:${
      currentDate.getSeconds()}.${
      currentDate.getMilliseconds()}`;
  },
  randomInt(max) {
    return Math.floor((Math.random() * max) + 1);
  },
  addEvent(elementParam, type, eventHandle) {
    const element = elementParam;
    if (element == null || typeof (element) === 'undefined') {
      return;
    }

    if (element.addEventListener) {
      element.addEventListener(type, eventHandle, false);
    } else if (element.attachEvent) {
      element.attachEvent(`on${type}`, eventHandle);
    } else {
      element[`on${type}`] = eventHandle;
    }
  },
  removeFromArrayByIdent(ident, itemsArray) {
    return itemsArray.filter((item) => item.ident !== ident);
  },
  removeFromArrayBySlot(slot, itemsArray) {
    return itemsArray.filter((item) => item.slot !== slot);
  },
};

export default Utils;
