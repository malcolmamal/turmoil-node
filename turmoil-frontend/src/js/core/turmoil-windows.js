import jQuery from 'jquery';
import Tooltip from './turmoil-tooltip';
import Layout from './turmoil-layout';

const Windows = {
  windowSizes: {
    consoleWidth: 600,
    consoleHeight: 260,
    equipmentWidth: 800,
    equipmentHeight: 830,
    stashWidth: 500,
    stashHeight: 700,
    statsWidth: 300,
    statsHeight: 700,
    locationWidth: 850,
    locationHeight: 810,
  },
  initWindow(windowType, isScalable) {
    let isVisible = false;
    // let scale; // TODO
    let verticalPos;
    let horizontalPos;

    if (typeof (window.turmoil.windowSettings[windowType]) === 'undefined') {
      window.turmoil.windowSettings[windowType] = {};
    } else {
      verticalPos = window.turmoil.windowSettings[windowType].top;
      horizontalPos = window.turmoil.windowSettings[windowType].left;
      isVisible = window.turmoil.windowSettings[windowType].visible;
    }

    const windowResizer = jQuery(`#window_${windowType}_resizer`);
    windowResizer.draggable({
      handle: `#handle_${windowType}_container`,
      containment: '.turmoilBody',
      stack: '.windowResizer',
      snap: '.windowResizer',
      snapMode: 'outer',
      start() {
        Tooltip.hideAllTooltips();
      },
      stop() {
        Tooltip.hideAllTooltips();

        window.turmoil.windowSettings[windowType].left = windowResizer.css('left');
        window.turmoil.windowSettings[windowType].top = windowResizer.css('top');
        Windows.saveWindowsPositions();
      },
    });

    windowResizer.resizable({
      aspectRatio: true,
      helper: 'ui-resizable-helper',
      start() {
        Tooltip.hideAllTooltips();
      },
      stop() {
        Tooltip.hideAllTooltips();

        const keyWidth = `${windowType}Width`;
        if (isScalable && Windows.windowSizes[keyWidth] !== 0) {
          const scale = jQuery(`#window_${windowType}_resizer`).width() / Windows.windowSizes[keyWidth];
          Windows.setWindowScale(scale, windowType);

          // var positionFix = (jQuery("#window_" + windowType + "_resizer").width() - Windows.windowSizes[keyWidth]) / 2;
          // console.log('positionFix', positionFix);
          // jQuery("#window_" + windowType + "_wrapper").css('top', positionFix + 'px');

          // fixing the horizontal alignment
          Windows.fixHorizontalAlignment(`window_${windowType}_resizer`, `window_${windowType}_wrapper`);

          // TODO: save changes with ajax

          window.turmoil.windowSettings[windowType].scale = scale;
          Windows.saveWindowsPositions();
        }
      },
    });

    if (typeof (isVisible) !== 'undefined' && isVisible) {
      if (typeof (verticalPos) === 'undefined' || typeof (horizontalPos) === 'undefined') {
        Windows.resizeToDefault(windowType, true);
      } else {
        windowResizer.css('left', window.turmoil.windowSettings[windowType].left);
        windowResizer.css('top', window.turmoil.windowSettings[windowType].top);
        Windows.actionShow(windowType);
      }
    } else {
      Windows.actionClose(windowType);
    }

    // TODO: check if it is not out of bounds
    windowResizer.css('top', `${verticalPos}px`);
    windowResizer.css('left', `${horizontalPos}px`);
  },
  setWindowScale(scale, windowType) {
    const windowWrapper = jQuery(`#window_${windowType}_wrapper`);
    windowWrapper.css('transform', `scale(${scale})`);
    windowWrapper.css('-webkit-transform', `scale(${scale})`);
    windowWrapper.css('-moz-transform', `scale(${scale})`);
    windowWrapper.css('-o-transform', `scale(${scale})`);
  },
  fixHorizontalAlignment(parentId, childId) {
    // fixing the horizontal alignment

    const parent = document.querySelector(`#${parentId}`);
    const child = document.querySelector(`#${childId}`);

    child.style.left = '0px';

    const properLeftPosition = parent.getBoundingClientRect().left;
    const wrongLeftPosition = child.getBoundingClientRect().left;
    const newPosition = Math.round(properLeftPosition - wrongLeftPosition);

    child.style.left = `${newPosition}px`;
  },
  resizeToDefault(windowType, setToCenter) {
    // TODO: check if it is necessary (and possible) to move the window higher (so it would not go over the footer)

    Windows.actionMaximize(windowType, setToCenter);

    const keyWidth = `${windowType}Width`;
    const keyHeight = `${windowType}Height`;
    const fullHeight = Math.round(Windows.windowSizes[keyHeight] + 40);

    const windowResizer = document.querySelector(`#window_${windowType}_resizer`);
    windowResizer.style.width = `${Windows.windowSizes[keyWidth]}px`;
    windowResizer.style.height = `${fullHeight}px`;

    const scale = 1;
    Windows.setWindowScale(scale, windowType);
    window.turmoil.windowSettings[windowType].scale = scale;

    // fixing the horizontal alignment
    Windows.fixHorizontalAlignment(`window_${windowType}_resizer`, `window_${windowType}_wrapper`);

    return false;
  },
  actionClose(windowType) {
    Tooltip.hideAllTooltips();

    document.querySelector(`#window_${windowType}_resizer`).style.display = 'none';
    window.turmoil.windowSettings[windowType].visible = false;

    Windows.saveWindowsPositions();
  },
  actionShow(windowType) {
    Tooltip.hideAllTooltips();
    Windows.bringToTheTop(windowType);

    document.querySelector(`#window_${windowType}_resizer`).style.display = 'block';
    window.turmoil.windowSettings[windowType].visible = true;

    Windows.saveWindowsPositions();
  },
  actionMaximize(windowType, setToCenter) {
    // TODO: check if it is necessary (and possible) to move the window higher (so it would not go over the footer)

    Windows.actionShow(windowType);

    const windowContentWrapper = document.querySelector(`#window_${windowType}_content_wrapper`);
    const windowContainer = document.querySelector(`#handle_${windowType}_container`);

    windowContentWrapper.style.display = 'block';
    document.querySelector(`#${windowType}ButtonMaximize`).style.display = 'none';
    document.querySelector(`#${windowType}ButtonMinimize`).style.display = 'block';

    const handleHeight = windowContainer.getBoundingClientRect().bottom - windowContainer.getBoundingClientRect().top;
    const contentHeight = windowContentWrapper.getBoundingClientRect().bottom - windowContentWrapper.getBoundingClientRect().top;
    const totalHeight = Math.round(handleHeight + contentHeight);

    const windowResizer = document.querySelector(`#window_${windowType}_resizer`);
    windowResizer.style.height = `${totalHeight}px`;

    if (setToCenter) {
      Layout.centerContentHorizontally(windowResizer);

      window.turmoil.windowSettings[windowType].left = windowResizer.style.left;
      window.turmoil.windowSettings[windowType].top = windowResizer.style.top;
    }
  },
  actionMinimize(windowType) {
    Tooltip.hideAllTooltips();

    document.querySelector(`#window_${windowType}_content_wrapper`).style.display = 'none';
    document.querySelector(`#${windowType}ButtonMaximize`).style.display = 'block';
    document.querySelector(`#${windowType}ButtonMinimize`).style.display = 'none';

    const handleContainer = document.querySelector(`#handle_${windowType}_container`);
    const handleHeight = handleContainer.getBoundingClientRect().bottom - handleContainer.getBoundingClientRect().top;
    document.querySelector(`#window_${windowType}_resizer`).style.height = `${Math.round(handleHeight)}px`;
  },
  switchShowClose(windowType, setToCenter) {
    if (jQuery(`#window_${windowType}_content_wrapper`).is(':visible')) {
      Windows.actionClose(windowType);
    } else if (typeof (window.turmoil.windowSettings[windowType]) === 'undefined'
        || typeof (window.turmoil.windowSettings[windowType].left) === 'undefined'
        || typeof (window.turmoil.windowSettings[windowType].top) === 'undefined') {
      Windows.resizeToDefault(windowType, setToCenter);
    } else {
      Windows.actionShow(windowType);
    }
  },
  switchMinimizeMaximize(windowType) {
    if (document.querySelector(`#window_${windowType}_content_wrapper`).style.display === 'none') {
      Windows.actionMaximize(windowType);
    } else {
      Windows.actionMinimize(windowType);
    }
  },
  bringToTheTop(windowType) {
    Tooltip.hideAllTooltips();

    let highestZIndexValue = 0;

    document.querySelectorAll('.windowResizer').forEach((element) => {
      if (element.style.zIndex > highestZIndexValue) {
        highestZIndexValue = parseInt(element.style.zIndex, 10);
      }
    });

    highestZIndexValue += 1;
    document.querySelector(`#window_${windowType}_resizer`).style.setProperty('z-index', highestZIndexValue);
  },
  resetZIndex() {
    document.querySelectorAll('.windowResizer').forEach((element) => {
      element.style.setProperty('z-index', 0);
    });
  },
  saveWindowsPositions(forceSaveParam) {
    let forceSave = forceSaveParam;
    if (typeof (forceSave) === 'undefined') {
      forceSave = false;
    }

    localStorage.setItem('windowSettings', JSON.stringify(window.turmoil.windowSettings));

    // window.turmoil.ajax.exec({
    //  url: 'account/saveWindowsSettings/' + encodeURI(JSON.stringify(window.turmoil.windowSettings))
    // });

    // + '&save=' + forceSave
  },
  switchWindow(windowType) {
    Tooltip.hideAllTooltips();

    const resizer = jQuery(`#window_${windowType}_resizer`);
    if (resizer.is(':hidden')) {
      resizer.show();
      Windows.bringToTheTop(windowType);
    } else {
      resizer.hide();
    }
  },
};

jQuery(() => {
  jQuery.each(jQuery.find('.windowIcon'), (index, value) => {
    jQuery(value).draggable({
      revert: true,
    });
  });

  /**
 * TODO: fix
 *
 * seems to react to any key...
 */

/*
  jQuery(document).bind('keydown', 'i', function () {
    switchWindow('equipment')
  });
  jQuery(document).bind('keydown', 'c', function () {
    switchWindow('stats')
  });
  jQuery(document).bind('keydown', 's', function () {
    switchWindow('stash')
  });

  jQuery(document).bind('keydown', 'n', function () {
    switchWindow('instance')
  });

  jQuery(document).bind('keydown', 'o', function () {
    switchWindow('console')
  });
*/
});

export default Windows;
