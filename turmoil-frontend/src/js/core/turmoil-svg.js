import jQuery from 'jquery';
import Logger from '../utils/logger';

const Svg = {
  addClass(element, className) {
    const domElement = this.toDOMElement(element);

    domElement.classList.add(className);
  },
  toDOMElement(element) {
    let domElement = element;
    if (domElement instanceof jQuery) {
      [domElement] = domElement.get();
    }

    return domElement;
  },
  removeClass(element, className) {
    const domElement = this.toDOMElement(element);

    domElement.classList.remove(className);
  },
  replaceClass(element, newClassName, oldClassName) {
    Svg.removeClass(element, oldClassName);
    Svg.addClass(element, newClassName);
  },
  printClass(element) {
    Logger.log(element.attr('class'));

    return element.attr('class');
  },
};

export default Svg;
