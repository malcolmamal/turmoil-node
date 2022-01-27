import jQuery from 'jquery';
import Logger from '../utils/logger';

const Svg = {
  addClass(element, className) {
    const domElement = this.toDOMElement(element);

    let newClasses = '';
    let hasClass = false;
    jQuery.each(domElement.className.baseVal.replace(/[\s]+/g, ' ').trim().split(' '), (index, value) => {
      newClasses += ` ${value}`;
      if (className === value) {
        hasClass = true;
      }
    });

    if (!hasClass) {
      newClasses += ` ${className}`;
    }

    domElement.className.baseVal = jQuery.trim(newClasses);
  },
  addClassWithDuration(element, className, duration) {
    jQuery(element).addClass(className, duration);
  },
  removeClassWithDuration(element, className, duration) {
    jQuery(element).removeClass(className, duration);
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

    let newClasses = '';
    jQuery.each(domElement.className.baseVal.replace(/[\s]+/g, ' ').trim().split(' '), (index, value) => {
      if (className !== value) {
        newClasses += ` ${value}`;
      }
    });
    domElement.className.baseVal = jQuery.trim(newClasses);
  },
  hasClass(element, className) {
    const domElement = this.toDOMElement(element);

    // TODO: there is also something called animVal, is this important?

    let hasClass = false;
    jQuery.each(domElement.className.baseVal.replace(/[\s]+/g, ' ').trim().split(' '), (index, value) => {
      if (className === value) {
        hasClass = true;
      }
    });

    return hasClass;
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
