import Logger from '../utils/logger';

const Svg = {
  addClass(element, className) {
    element.classList.add(className);
  },
  removeClass(element, className) {
    element.classList.remove(className);
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
